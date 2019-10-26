// //서비스 워커라 함 
// self.addEventListener('push', (event) => {
//   console.log('[Service Worker] Push Received.');
//   console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
// 	console.log(`${event.data.text()}`);
//   console.log(event);
//   const data = JSON.parse(`${event.data.text()}`);
//   console.log(data)
//   const title = data.title;
//   const options = {
//     title: title,
//     body: data.content,
//     icon: '/logo192.png',
//     badge: '/logo192.png'
//   };
// 	const notificationPromise = self.registration.showNotification(title, options);
// 	event.waitUntil(notificationPromise);
// });
// self.addEventListener('notificationclick', (event) => {
//   //푸시 노티피케이션 에서 클릭 리스너
// 	var data = `${event.data}`;
// 	console.log(data);
//   console.log('[Service Worker] Notification click Received.');
//   console.log(`${event}`);
//   console.log(`${event.notification}`);
// 	console.log(event);
// 	event.notification.close();
// 	//event.waitUntil( clients.openWindow( data.url ) );
// });
self.addEventListener('push', function(event) {
  //푸시 리스너
	var payload = event.data.json();
	const title = payload.title;
	const options = {
		body: payload.body,
		icon: '/my-push-logo.png',
		badge: '/my-push-logo.png',
		vibrate: [200, 100, 200, 100, 200, 100, 400],
		data : payload.params
	};
	event.waitUntil( self.registration.showNotification(title, options) );
});

self.addEventListener('notificationclick', function(event) {
  //푸시 노티피케이션 에서 클릭 리스너
	var data = event.notification.data;
	event.notification.close();
	event.waitUntil( clients.openWindow( data.url ) );
});