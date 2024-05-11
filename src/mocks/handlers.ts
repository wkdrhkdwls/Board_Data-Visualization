import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/error', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        message: 'mock 에러입니다',
      },
      { status: 400 },
    );
  }),
];
