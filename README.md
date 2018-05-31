Microsynth
==========

My implementation of a web-based microsynth using the Web Audio API. This is currently still in progress, and is definitely **_unfinished_**.

![Microsynth](https://github.com/musomatt/microsynth/raw/master/public/images/microsynth.png)

### Installation
To set up a local dev version of this project, clone the repository and run:
`npm install && npm start`

This will start a local development server on http://localhost:3000/

If you want to run a compiled production version of the app you can run `npm run build` to get the production assets ready in the /build/ directory. Yarn support is available too, if you prefer that.

If you have any issues running this locally you can [view the version I'm hosting here](https://microsynth.musomatt.com/).


### Features
- Two oscillators to manipulate with their own gain, pan, and tune controls
- Master controls for pitch/pan/gain
- Volume metering to show current levels
- Plays a standard dominant 7th arp pattern.
- Will render/play on desktop and mobile devices

### Todo list:
I will try and find time to fix a few remaining issues:
- **test suite**: I haven't yet implemented testing, I was hoping I'd have time to get this done, but not managed to get that sorted. I've focused mostly on making the UI elegant and getting everything working correctly so far. 
- **dial control on mobile devices**: while the UI is responsive to browser sizes, it can be improved and there currently isn't support for touch control of the input dials.
- **click and drag support for dials in the browser**: Mouse wheel and  two-finger gestures (!) work on trackpads to manipulate the audio nodes but the obvious one (click + drag up/down) to turn dials, I haven't yet coded up.
- **hardware support**: I'm currently away from home visiting relatives since the bank holiday and don't have a midi device with me to get this going. But I'll definitely add this.
- **some quick wins**: The hardcoded frequency values in my constants file is not ideal but worked for now. It would also be trivial to next add scale patterns, some more arpeggio patterns, and a basic light-up keys programmed to display those values. It already has pitch shifting, so a quick juggle to the UI and octave shift would be trivial to implement.