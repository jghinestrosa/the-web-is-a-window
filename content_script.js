const state = {
  enabled: false,
  svg: null
};

const svg = `<svg width="800" height="600" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 100000;">
  <defs>
    <filter id="bottomShadow" x="0" y="0" width="100%" height="200%">
      <feGaussianBlur in="SourceAlpha" result="blur" stdDeviation="5" />
      <feOffset in="blur" dy="1" result="offsetBlur" />
      <feMerge>
        <feMergeNode in="offsetBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="topFrameInnerShadow" x="0" y="0" width="100%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur"/>
      <feOffset in="blur" dx="0" dy="5" result="offsetBlur"/>
      <feFlood flood-color="#173c73" flood-opacity="0.5" result="offsetColor"/>
      <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="colorOffsetBlur"/>
      <feMerge>
        <feMergeNode in="colorOffsetBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="rightFrameInnerShadow" x="0" y="0" width="200%" height="100%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur"/>
      <feOffset in="blur" dx="5" dy="0" result="offsetBlur"/>
      <feFlood flood-color="#173c73" flood-opacity="0.5" result="offsetColor"/>
      <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="colorOffsetBlur"/>
      <feMerge>
        <feMergeNode in="colorOffsetBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="leftFrameInnerShadow" x="0" y="0" width="200%" height="100%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur"/>
      <feOffset in="blur" dx="5" dy="0" result="offsetBlur"/>
      <feFlood flood-color="#173c73" flood-opacity="0.5" result="offsetColor"/>
      <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="colorOffsetBlur"/>
      <feMerge>
        <feMergeNode in="colorOffsetBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="crossShadow" x="0" y="0" width="100%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="20" result="blur"/>
      <feOffset in="blur" dx="0" dy="5" result="offsetBlur"/>
      <feFlood flood-color="#173c73" flood-opacity="0.5" result="offsetColor"/>
      <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="colorOffsetBlur"/>
      <feMerge>
        <feMergeNode in="colorOffsetBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- Window borders-->
  <rect width="260" fill="#8000ff" height="600"></rect>
  <rect x="540" width="260" fill="#8000ff" height="600"></rect>
  <rect height="90" fill="#8000ff" width="800"></rect>
  <rect y="490" height="110" fill="#8000ff" width="800"></rect>

  <!-- frame fill -->
  <rect x="260" y="90" width="20" height="380" fill="#3d89ff" filter="url(#leftFrameInnerShadow)"></rect>
  <rect x="520" y="90" width="20" height="380" fill="#3d89ff" filter="url(#rightFrameInnerShadow)" transform="rotate(180, 530, 280)"></rect>
  <rect x="279" y="90" width="242" height="20" fill="#3d89ff" filter="url(#topFrameInnerShadow)"></rect>
  <rect x="260" y="450" width="280" height="20" fill="#3d89ff"></rect>

  <!-- frame borders -->
  <rect x="260" y="90" width="280" height="400" stroke="#361abb" fill="transparent"></rect>
  <rect x="280" y="110" width="240" height="340" stroke="#361abb" fill="transparent"></rect>

  <!-- frame corners -->
  <line x1="280" y1="110" x2="260" y2="90" stroke="#361abb"></line>
  <line x1="520" y1="110" x2="540" y2="90" stroke="#361abb"></line>
  <line x1="280" y1="450" x2="260" y2="470" stroke="#361abb"></line>
  <line x1="520" y1="450" x2="540" y2="470" stroke="#361abb"></line>

  <!-- cross -->
  <rect x="400" y="110" width="5" height="340" stroke="#361abb" fill="#3d89ff"></rect>
  <rect x="280" y="280" width="240" height="5" stroke="#361abb" fill="#3d89ff" filter="url(#crossShadow)"></rect>

  <!-- bottom -->
  <rect x="260" y="480" width="280" height="20" stroke="#361abb" fill="#3d89ff"></rect>
  <rect x="250" y="470" width="300" height="10" stroke="#361abb" fill="#3d89ff" filter="url(#bottomShadow)"></rect>
</svg>
`;

const div = document.createElement('div');
div.innerHTML = DOMPurify.sanitize(svg);
state.svg = div.firstChild;

browser.runtime.onMessage.addListener(({ tabId }) => {
  if (state.enabled) {
    document.body.removeChild(state.svg);
  }
  else {
    document.body.appendChild(state.svg);
  }

  state.enabled = !state.enabled;
  browser.runtime.sendMessage({ enabled: state.enabled, tabId });
});
