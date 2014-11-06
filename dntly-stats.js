var DNTLY_STATS = DNTLY_STATS || (function(){

    var _args = {}; // private

    return {
        init : function(Args) {
        	Args  = Args || {}
            _args = Args;
            

            _args.campaign_id  = (typeof Args.campaign_id !== 'undefined') ? Args.campaign_id : '1';
            _args.orientation  = (typeof Args.orientation !== 'undefined') ? Args.orientation : 'vertical';
            _args.use_css      = (typeof Args.use_css !== 'undefined') ? Args.use_css : true;

            // Set orientation attribute conditionally
            var orientation_attr = ( _args.orientation === 'vertical' ) ? 'height' : 'width';


            // Styles
            if ( _args.use_css && _args.use_css == true ) {

	            var css = document.createElement("style");
	            	css.type = "text/css";
	            	css.innerHTML = ' \
	            		.dntly-stats, .dntly-stats * { \
	            			-webkit-box-sizing: border-box; \
	            			-moz-box-sizing: border-box; \
	            			box-sizing: border-box; \
	            		} \
	            		.dntly-stats { \
	            			position:relative; \
	            			width:auto; \
	            			height:auto; \
	            			font-family: "Hevetica Neue", Helvetica, Arial, sans-serif; \
	            			font-size: 12px; \
	            			text-transform: uppercase; \
	            			font-weight: bold; \
	            		} \
	            		.dntly-stats .goal-amount { \
	            			position:absolute; \
	            			top:0;left:0; \
	            			text-align:center; \
	            			width:100%; \
	            			line-height:40px; \
	            		} \
	            		.dntly-stats .amount-raised { \
	            			color: white; \
	            			width:100%; \
	            			line-height:40px; \
	            			text-align: center;	 \
	            		} \
	            		.dntly-stats .bar { \
	            			display:inline-block; \
	            			position:relative; \
	            			background-color: #eff1f5; \
	            			border-radius: 3px; \
	            			width:80px; \
	            			height:380px; \
	            		} \
	            		.dntly-stats .bar.bar--loading:before { \
							content: ""; \
							position:absolute; top:0; left:0; \
							height:100%;width:100%; \
							line-height:50px; \
							background-image:url("data:image/gif;base64,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"); \
							background-position: 50% 50%; \
							background-repeat: no-repeat; \
	            		} \
	            		.dntly-stats .bar.bar--loaded .amount-raised { \
							opacity: 1; \
	            		} \
	            		.dntly-stats .bar.bar--loaded .goal-amount { \
							opacity: 1; \
	            		} \
	            		.dntly-stats .bar .bar--progress { \
	            			position:absolute; \
	            			left:0;bottom:0; \
	            			background-color: #678ec2; \
	            			border-radius: 0 0 3px 3px; \
	            			height:0%; \
	            			width:100%; \
	            			-webkit-transition: height 250ms linear, width 250ms linear; \
	            			-o-transition: height 250ms linear, width 250ms linear; \
	            			transition: height 250ms linear, width 250ms linear; \
	            		} \
	            		.dntly-stats.horizontal .bar { \
	            			width:380px; \
	            			height:50px; \
	            		} \
	            		.dntly-stats.horizontal .bar .bar--progress { \
	            			height:100%; \
	            			width:0%; \
	            		} \
	            		.dntly-stats.horizontal .amount-raised { \
	            			line-height:50px; \
	            			opacity:0; \
	            			-webkit-transition: opacity 150ms linear; \
	            			-o-transition: opacity 150ms linear; \
	            			transition: opacity 150ms linear; \
	            		} \
	            		.dntly-stats.horizontal .goal-amount { \
	            			line-height:50px; \
	            			opacity:0; \
	            			-webkit-transition: opacity 150ms linear; \
	            			-o-transition: opacity 150ms linear; \
	            			transition: opacity 150ms linear; \
	            			text-align: right; \
	            			padding-right: 15px; \
	            		} \
	            	';

	            document.body.appendChild(css);
	        }

	        var random_id      = 'dntly-stats-id__'+Math.floor((Math.random() * 100) + 1);

	        // Create & append parent node
	        document['body']
	        	.appendChild(document.createElement('div'))
	        	.setAttribute('id', random_id)

	        document.getElementById(random_id)
	        	.setAttribute('class', 'dntly-stats')

	        // Set orientation class
	        document.querySelector('#'+random_id)
	        	.className = document.querySelector('#'+random_id).className + ' ' + _args.orientation

	        // Create & append child nodes
	        document.querySelector('#'+random_id)
	        	.appendChild(document.createElement('div'))
	        	.setAttribute('class', 'bar bar--loading')


            sendRequest('http://www.dntly.com/api/v1/public/campaigns/'+_args.campaign_id+'.json', function (data) {

            	var json = data.response;
            		json = JSON.parse(json);
            		json = json.campaign;

            	console.log(json);

            	var percent_raised = (json.amount_raised / json.campaign_goal) * 100;


            	document.querySelector('#'+random_id+' .bar')
            		.appendChild(document.createElement('div'))
            		.setAttribute('class', 'goal-amount')

            	document.querySelector('#'+random_id+' .bar')
            		.appendChild(document.createElement('div'))
            		.setAttribute('class', 'bar--progress')

            	document.querySelector('#'+random_id+' .bar--progress')
            		.appendChild(document.createElement('div'))
            		.setAttribute('class', 'amount-raised')


            	// Append some data immediatly
            	document.querySelector('#'+random_id+' .goal-amount')
            		.innerHTML = '$'+json.campaign_goal.toFixed(0);

            	document.querySelector('#'+random_id+' .amount-raised')
            		.innerHTML = '$'+json.amount_raised.toFixed(0);

            	// Append data after timeout
            	setTimeout(function() {

            		// Remove loading class
            		document.querySelector('#'+random_id+' .bar')
            			.className = 'bar bar--loaded'

            		// Set percent raised as height
            		document.querySelector('#'+random_id+' .bar--progress')
            			.setAttribute('style', orientation_attr+':'+percent_raised+'%');

            	}, 50)


            })

        }
    };

}());

function sendRequest(url,callback,postData) {
    var req = createXMLHTTPObject();
    if (!req) return;
    var method = (postData) ? "POST" : "GET";
    req.open(method,url,true);
    // req.setRequestHeader('User-Agent','XMLHTTP/1.0');
    if (postData)
        req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    req.onreadystatechange = function () {
        if (req.readyState != 4) return;
        if (req.status != 200 && req.status != 304) {
        	console.log('HTTP error ' + req.status);
            return;
        }
        callback(req);
    }
    if (req.readyState == 4) return;
    req.send(postData);
}

var XMLHttpFactories = [
    function () {return new XMLHttpRequest()},
    function () {return new ActiveXObject("Msxml2.XMLHTTP")},
    function () {return new ActiveXObject("Msxml3.XMLHTTP")},
    function () {return new ActiveXObject("Microsoft.XMLHTTP")}
];

function createXMLHTTPObject() {
    var xmlhttp = false;
    for (var i=0;i<XMLHttpFactories.length;i++) {
        try {
            xmlhttp = XMLHttpFactories[i]();
        }
        catch (e) {
            continue;
        }
        break;
    }
    return xmlhttp;
}
