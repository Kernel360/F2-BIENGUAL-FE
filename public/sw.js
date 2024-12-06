// install 이벤트: offline.html 캐싱
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('cache-v1').then((cache) => {
      return cache.addAll([
        '/offline.html', // offline.html 파일을 캐싱
      ]);
    }),
  );
  console.log('Service Worker 설치 완료');
});

// fetch 이벤트
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then(async (response) => {
        // 네트워크 요청 성공 시 캐시에 저장
        const cache = await caches.open('cache-v1');
        cache.put(event.request, response.clone());
        return response;
      })
      .catch(async () => {
        // 네트워크 요청 실패 시 캐시에서 offline.html 반환
        const cache = await caches.open('cache-v1');
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          console.log('캐시에서 응답 반환');
          return cachedResponse;
        }
        // offline.html을 캐시에서 반환
        console.log('네트워크와 캐시 모두 실패');
        return cache.match('/offline.html');
      }),
  );
});
