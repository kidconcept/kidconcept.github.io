(function($, a){
	function Application(){
		this.id = 'Enrollment123-' + (new Date().getTime());
		this.locationMonitorInterval = null;
		this.locationMonitorDelay = 150;
		this.locationFrame = null;
		this.currentLocation = null;
		this.currentView = null;
		this.controllers = [];
		this.routeMappings = [];
		this.models = {
			cache: {},
			classes: {}
		};
		this.views = {
			cache: {},
			classes: {}
		};
		
		if(a) {
			this.loadVars(a);
		};
				
		this.locationEvent = null;
		
		$(this).bind("locationchange", this.proxyCallback(this.onLocationChange));
	};
	
	Application.prototype.loadVars = function(a)
	{
		var self = this;
		
		a = this.normalizeJSON(a);
			
		for(var i in a) {
			this[i] = a[i];
		};
	};
	
	Application.prototype.ajax = function(options){
		var self = this;

		var ajaxOptions = $.extend(
			{
				type: "get",
				dataType: "json",
				normalizeJSON: false,
				cache: false,
				async: true,
				timeout: (10 * 1000),
				success: function(response, statusText){},
				error: function(request, statusText, error){
					//alert("There was a critical error communicating with the server");
					console.info("There was a critical error communicating with the server");
				},
				complete: function(request, statusText){}
			},
			options
		);
		
		if (ajaxOptions.normalizeJSON && (ajaxOptions.dataType == "json") && options.success) {
			var targetSuccess = options.success;
			
			ajaxOptions.success = function(response, statusText){
				targetSuccess(self.normalizeJSON(response));
			};
		};
		
		$.ajax(ajaxOptions);	
	};
	
	Application.prototype.ajaxFileUpload = function(options){
		var self = this;
		
		var ajaxOptions = $.extend(
			{
				secureuri: false,
				dataType: "json",
				data: {},
				normalizeJSON: false,
				success: function(response, statusText){},
				error: function(response, statusText, error){
					alert('There was a critical error communicating with the server');
				}
			},
			options
		);
		
		if (ajaxOptions.normalizeJSON && (ajaxOptions.dataType == "json") && options.success) {
			var targetSuccess = options.success;
			
			ajaxOptions.success = function(response, statusText){
				targetSuccess(self.normalizeJSON(response));
			};
		};
		
		$.ajaxFileUpload(ajaxOptions);
	};
	
	Application.prototype.normalizeJSON = function(object){
		var self = this;
		
		if ((typeof(object) == "boolean") || (typeof(object) == "string") || (typeof(object) == "number") || $.isFunction(object)) {
			return(object);
		};
		
		if ($.isArray(object)) {
			var normalizedObject = [];
			
			$.each(
				object,
				function(index, value){
					normalizedObject[index] = self.normalizeJSON(value);
				}
			);
		}
		else{
			var normalizedObject = {};
			
			$.each(
				object,
				function(key, value){
					normalizedObject[key.toLowerCase()] = self.normalizeJSON(value);
				}
			);
		};
		
		return(normalizedObject);
	};
	
	Application.prototype.getFromTemplate = function(template, model) {
		var templateData = template.html();
		
		templateData = templateData.replace(
			new RegExp("\\$\\{([^\\}]+)\\}", "gi"),
			function($0, $1){
				if ($1 in model){
					return(model[$1]);
				} else {
					return($0);
				}
			}
		);
	
		return($(templateData).data("model", model));
	};
	
	Application.prototype.isEmail = function(email) {
		if(email.length)
			return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
		else
			return(true);
	};
	
	Application.prototype.isPhoneNumber = function(number) {
		if(number.length)
			return(/^\(?([2-9][0-8][0-9])\)?[-. ]?([2-9][0-9]{2})[-. ]?([0-9]{4})$/.test(number));
		else
			return(true);
	};
	
	Application.prototype.isDate = function(date) {
		var tmpDate = new Date(date);
		
		if(Object.prototype.toString.call(tmpDate) === '[object Date]') {
			if(!isNaN(tmpDate.getMonth()))
				return(true)
		}
		
		return(false);
	};
	
	Application.prototype.getMonthFromDate = function(date) {
		var month = '';
		var tmpDate = new Date(date);
		
		if(Object.prototype.toString.call(tmpDate) === '[object Date]') {
			if(!isNaN(tmpDate.getMonth()))
				month = tmpDate.getMonth() + 1;
		};
		
		return(month);
	};
	
	Application.prototype.getDayFromDate = function(date) {
		var day = '';
		var tmpDate = new Date(date);
		
		if(Object.prototype.toString.call(tmpDate) === '[object Date]') {
			if(!isNaN(tmpDate.getDate()))
				day = tmpDate.getDate();
		};
		
		return(day);
	};
	
	Application.prototype.getYearFromDate = function(date) {
		var year = '';
		var tmpDate = new Date(date);
		
		if(Object.prototype.toString.call(tmpDate) === '[object Date]') {
			if(!isNaN(tmpDate.getFullYear()))
				year = tmpDate.getFullYear();
		};
		
		return(year);
	};
	
	Application.prototype.addClass = function(target, value){
		var constructor = value.constructor;
		
		if(constructor == Function){
			var className = value.toString().match(new RegExp("^function\\s+([^\\s\\(]+)", "i"))[1];
			target.classes[className] = value;
		}
		else{
			var className = value.constructor.toString().match(new RegExp("^function\\s+([^\\s\\(]+)", "i"))[1];
			target.classes[className] = value.constructor;
			target.cache[className] = value;
		}
	};
	
	Application.prototype.addController = function(controller){
		this.controllers.push(controller);
	};
	
	Application.prototype.addModel = function(model){
		this.addClass(this.models, model);
	};
	
	Application.prototype.addView = function(view){
		this.addClass(this.views, view);
	};
	
	Application.prototype.getClass = function(target, className, args){
		if (target.cache[className]) {
			return(target.cache[className]);
		}
		else{
			var newInstance = new (target.classes[className])();
			target.classes[className].apply(newInstance, args);
			return(newInstance);
		}
	};
	
	Application.prototype.getModel = function(className, args){
		return(this.getClass(this.models, className, args));
	};
	
	Application.prototype.getView = function(className, args){
		return(this.getClass(this.views, className, args));
	};
	
	Application.prototype.initClasses = function(classes){
		$.each(
			classes,
			function(index, instance)
			{
				if (instance.init){
					instance.init();
				}
			}
		);
	};
	
	Application.prototype.initControllers = function(){
		this.initClasses(this.controllers);
	};
	
	Application.prototype.initModels = function(){
		this.initClasses(this.models.cache);
	};
	
	Application.prototype.initViews = function(){
		this.initClasses(this.views.cache);
	};
	
	Application.prototype.checkLocationForChange = function(){
		var liveLocation = this.normalizeHash(window.location.hash);
			
		if (
			(this.currentLocation == null) ||
			(this.currentLocation != liveLocation)
			){
			if (this.locationFrame){
				this.locationFrame.attr("src", "ie_back_button.htm?_=" + (new Date()).getTime() + "&hash=" + liveLocation);
			}
		
			this.setLocation(liveLocation);	
		};
	};
	
	Application.prototype.initLocationMonitor = function(){
		if (document.all){
			this.locationFrame = $('<iframe src="about:black" style="display: none;" />').appendTo(document.body);
		};
	};
	
	Application.prototype.normalizeHash = function(hash){
		return(
			hash.replace(new RegExp("^[#/]+|/$", "g"), "")
		);
	};
	
	Application.prototype.proxyCallback = function(callback){
		var self = this;
		
		return(
			function(){
				return(callback.apply(self, arguments));
			}
		);
	};
	
	Application.prototype.setLocation = function(location, parameters) {
		location = this.normalizeHash(location);
	
		var oldLocation = this.currentLocation;
		var newLocation = location;
		
		this.currentLocation = location;
		
		window.location.hash = ("#/" + location);
		
		$(this).trigger({
			type: "locationchange",
			fromLocation: oldLocation,
			toLocation: newLocation,
			parameters: parameters
		});
	};
	
	Application.prototype.startLocationMonitor = function(){
		var self = this;
		
		this.locationMonitorInterval = setInterval(
			function(){				
				self.checkLocationForChange();
			},
			this.locationMonitorDelay
		);
	};
	
	Application.prototype.stopLocationMonitor = function(){
		clearInterval(this.locationMonitorInterval);
	};
	
	Application.prototype.relocateTo = function(newLocation, parameters){
		this.setLocation(newLocation, parameters);
	};
	
	Application.prototype.Controller = function(){};
	
	Application.prototype.Controller.prototype = {
		route: function( path, handler ){
			path = application.normalizeHash( path );
		
			var parameters = [];
			
			var pattern = path.replace(
				new RegExp( "(/):([^/]+)", "gi" ),
				function( $0, $1, $2 ){
					parameters.push( $2 );
					
					return( $1 + "([^/]+)" );
				}
			);
			
			application.routeMappings.push({
				controller: this,
				parameters: parameters,
				test: new RegExp(("^" + pattern + "$"), "i"),
				handler : handler
			});
		}
	};
	
	Application.prototype.onLocationChange = function(locationChangeEvent) {
		var self = this;
		var keepRouting = true;
		
		this.stopLocationMonitor();
		
		$.each(
			this.routeMappings,
			function(index, mapping){
				var matches = null;
				
				if (!keepRouting){
					return;
				}
				
				var eventContext = {
					application: self,
					fromLocation: locationChangeEvent.fromLocation,
					toLocation: locationChangeEvent.toLocation,
					parameters: $.extend({}, locationChangeEvent.parameters)
				};
				
				if (matches = locationChangeEvent.toLocation.match(mapping.test)){
					matches.shift();
					
					$.each(
						matches,
						function(index, value){
							eventContext.parameters[mapping.parameters[index]] = value;
						}
					);
					
					if (mapping.controller.preHandler){
						mapping.controller.preHandler(eventContext);
					}
					
					var m = [eventContext].concat(matches);
					var result = mapping.handler.apply(
						mapping.controller,
						[eventContext].concat(matches)
					);
					
					if (mapping.controller.postHandler){
						mapping.controller.postHandler(eventContext);
					}
					
					if ((typeof(result) == "boolean") && !result){
						keepRouting = false;
					}
				}
			}
		);
		
		this.startLocationMonitor();
	};
	
	Application.prototype.run = function(){
		this.initModels();
		this.initViews();
		this.initControllers();
		
		if(this.monitor && this.monitor > 0) {
			this.initLocationMonitor();
			this.startLocationMonitor();
		}
	};
	
	window.application = new Application();
	
	$(function(){
		window.application.run();
	});
	
	// Return a new application instance.
	return(window.application);
})(jQuery, arguments);
