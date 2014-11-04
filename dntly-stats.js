var DNTLY_STATS = DNTLY_STATS || (function(){

    var _args = {}; // private

    return {
        init : function(Args) {
            _args = Args;
            
            _args.campaign_id = Args.campaign_id;

            // Styles
            var css = document.createElement("style");
            	css.type = "text/css";
            	css.innerHTML = ' \
            		#dntly-stats, #dntly-stats * { \
            			-webkit-box-sizing: border-box; \
            			-moz-box-sizing: border-box; \
            			box-sizing: border-box; \
            		} \
            		#dntly-stats { \
            			position:relative; \
            			width:200px; \
            			height:380px; \
            			text-align:right; \
            			font-family: "Hevetica Neue", Helvetica, Arial, sans-serif; \
            			font-size: 12px; \
            			text-transform: uppercase; \
            			font-weight: bold; \
            		} \
            		#dntly-stats .goal-amount { \
            			position:absolute; \
            			top:0;left:0; \
            			text-align:center; \
            			width:100%; \
            			height:40px; \
            			line-height:40px; \
            		} \
            		#dntly-stats .amount-raised { \
            			color: white; \
            			width:100%; \
            			height:40px; \
            			line-height:40px; \
            			text-align: center;	 \
            		} \
            		#dntly-stats .bar { \
            			display:inline-block; \
            			position:relative; \
            			background-color: #eff1f5; \
            			border-radius: 3px; \
            			width:80px; \
            			height:100%; \
            		} \
            		#dntly-stats .bar .bar--progress { \
            			position:absolute; \
            			left:0;bottom:0; \
            			background-color: #678ec2; \
            			border-radius: 0 0 3px 3px; \
            			height:0%; \
            			width:100%; \
            			-webkit-transition: height 250ms linear; \
            			-o-transition: height 250ms linear; \
            			transition: height 250ms linear; \
            		} \
            	';

            document.body.appendChild(css);


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


            sendRequest('http://www.dntly.com/api/v1/public/campaigns/'+_args.campaign_id+'.json', function (data) {

            	var json = data.response;
            		json = JSON.parse(json);
            		json = json.campaign;

            	console.log(json);

            	var percent_raised = (json.amount_raised / json.campaign_goal) * 100;

            	// Create & append parent node
            	document['body']
            		.appendChild(document.createElement('div'))
            		.setAttribute('id', 'dntly-stats')

            	// Create & append child nodes
            	document.getElementById('dntly-stats')
            		.appendChild(document.createElement('div'))
            		.setAttribute('class', 'bar')

            	document.querySelector('#dntly-stats .bar')
            		.appendChild(document.createElement('div'))
            		.setAttribute('class', 'goal-amount')

            	document.querySelector('#dntly-stats .bar')
            		.appendChild(document.createElement('div'))
            		.setAttribute('class', 'bar--progress')

            	document.querySelector('#dntly-stats .bar--progress')
            		.appendChild(document.createElement('div'))
            		.setAttribute('class', 'amount-raised')


            	// Append some data immediatly
            	document.querySelector('#dntly-stats .goal-amount')
            		.innerHTML = '$'+json.campaign_goal.toFixed(0);

            	document.querySelector('#dntly-stats .amount-raised')
            		.innerHTML = '$'+json.amount_raised.toFixed(0);

            	// Append data after timeout
            	setTimeout(function() {

            		// Set percent raised as height
            		document.querySelector('#dntly-stats .bar--progress')
            			.setAttribute('style', 'height:'+percent_raised+'%');

            	}, 50)


            })

        }
    };
}());
