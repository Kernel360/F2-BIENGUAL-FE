self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request) // 네트워크에서 먼저 시도
      .then(async (response) => {
        // console.log(response);
        // 네트워크 응답이 성공하면 캐시에 저장
        const cache = await caches.open('cache-v1');
        cache.put(event.request, response.clone()); // 응답 캐시에 저장
        return response;
      })
      .catch(async () => {
        // 네트워크 요청 실패 시 캐시에서 데이터 반환
        const cache = await caches.open('cache-v1');
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          console.log('캐시에서 응답 반환');
          return cachedResponse;
        }
        // 캐시에도 없으면 기본 응답 반환
        console.log('네트워크와 캐시 모두 실패');
        return new Response('오프라인 상태이며 캐시 데이터 없음', {
          status: 503,
          statusText: 'Service Unavailable',
        });
      }),
  );
});
