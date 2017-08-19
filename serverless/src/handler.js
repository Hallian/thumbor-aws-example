import Thumbor from 'thumbor';
import Config from './config';

export function hasher(event, context, callback) {
  const img = event.pathParameters.image;
  const image = () => new Thumbor(Config.SecurityKey, Config.ThumborUrl).setImagePath(img);

  const sizes = {
    'original': image().buildUrl(),
    'cropped': image().crop(1080, 200, 2840, 2320).buildUrl(),
    'cropped300x0': image().crop(1080, 200, 2840, 2320).resize(300, 0).buildUrl(),
    '300x0': image().resize(300, 0).buildUrl()
  };

  const reponse = {
    statusCode: 200,
    body: JSON.stringify(sizes)
  };

  callback(null, reponse);
}