import webpackImgSrc from '@assets/images/webpack.svg';
import '@assets/styles.css';

document.getElementById('app').innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use Webpack to bundle this application.
</div>
<div>
  <img src="${webpackImgSrc}" alt="Webpack" height="128px" width="128px">
</div>
`;
