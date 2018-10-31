
export default function HelixCanvas(targetName) {

    this.logEnabled = false;

    this.log("HelixCanvas");

    this.targetName = targetName;
    this.target = $("#" + this.targetName);

    // settings:
    this.stageColor = "#FFFFFF";
    this.dotHSLA = "hsla(270,100%,85%,255)";    // hsla(hue, saturation, lightness, alpha)
    this.dotSize =  76;
    this.blurLevels =  9;
    this.speed = 1;
    this.targetSpeed = 1;
    this.particleScale  = 0.33;

    // globals:
    this.c = createjs;
    this.stage = null;
    this.spriteSheet = null;
    this.helixes = [];
    this.w = 0;
    this.h = 0;
    this.t = 0;
    this.max = 0;
    this.min = 0;
    this.backgroundBubble01 = 15;
    this.backgroundBubble02 = 10;
    this.backgroundBubble03 = 1600;
    this.backgroundBubble04 = 21;

    // particle system tick event
    this.onParticleTicker = null;

    this.c.extend(HelixParticle, this.c.Sprite);
    this.c.promote(HelixParticle, "Sprite");

    this.createParticleSystem();
}

HelixCanvas.prototype.log = function(...args)
{
    if (this.logEnabled)
    {
        if (args.length === 1) console.log(args[0]);
            else if (args.length === 2) console.log(args[0], args[1]);
        else {
            console.log(args);
        }
    }
};

HelixCanvas.prototype.createParticleSystem = function()
{
    let ref = this;

    const helixParticleSystem = this.c.extend(Helix, this.c.Container);
    helixParticleSystem.set = function(o)
    {
        this.overscan = o.overscan == null ? 0.2 : o.overscan;
        this.particleScale = o.particleScale || 1;
        this.speed = o.speed || 1;
        this.amplitude = o.amplitude == null ? 0.5 : o.amplitude;
        this.altAmplitude = o.altAmplitude == null ? 0.5 : o.altAmplitude;
        this.startRotation = o.startRotation || 0;
        this.rotations = o.rotations == null ? 2 : o.rotations;
    };

    helixParticleSystem.createParticles = function()
    {
        const dots = this.particles;
        let l = this.particleCount;
        while (l-- > 0)
        {
            const seed = ref.rnd(1);
            const dot = new HelixParticle(ref.spriteSheet);
            dot.t = ref.rnd(Math.PI);
            dot.speed = Math.pow(seed * 0.5 + 0.5, 3);
            dot.size = 1 - dot.speed;
            dot.altAmp = ref.rnd(0.1, 0.6) * ref.rnd(0, dot.speed) * (ref.rnd(1) < 0.5 ? -1 : 1);
            dot.altPer = ref.rnd(0.3, 2);
            dot.altStart = ref.rnd(Math.PI * 2);
            dot.gotoAndStop(seed * ref.blurLevels|0);
            dots.push(dot);

            this.addChild(dot);
        }
    };

    helixParticleSystem.tick = function (delta)
    {
        if (ref.targetSpeed != ref.speed)
        {
            ref.speed = ref.speed + ( ref.targetSpeed - ref.speed ) * 0.1;
        }

        let fov = ref.min;
        const dots = this.particles;
        const a0 = this.amplitude * 0.5;
        const a1 = this.altAmplitude * 0.5;
        const pScale = this.particleScale * ref.particleScale;
        const rotations = this.rotations * Math.PI * 2;
        const startRotation = this.startRotation * Math.PI * 2;
        const adjW = ref.w * (1 + this.overscan * 2);

        for (let i = 0, l = dots.length; i < l; i++)
        {
            const dot = dots[i];
            const altPer = dot.altPer * Math.PI * 2;
            let t = (dot.t += delta * 0.0001 * this.speed * ref.speed * dot.speed) % 1;

            // base helix shape:
            if (t < 0) { t = 1 + t; }
            var x = t * adjW - adjW / 2;

            t = x / adjW;
            let y = Math.sin(t * rotations + startRotation) * ref.min * a0;
            let z = Math.cos(t * rotations + startRotation) * ref.min * a0;

            // introduce variation:
            y += Math.sin(t * altPer + dot.altStart) * ref.min * dot.altAmp * a1;
            z += Math.cos(t * altPer + dot.altStart) * ref.min * dot.altAmp * a1;

            let s = fov / (z + fov);
            dot.x = x * s; // disable perspective on the particle positions
            dot.y = y * s;
            dot.scaleX = dot.scaleY = Math.pow(s * (1 + dot.size), 2) * pScale;
            dot.alpha = s - 0.6;
        }
    };

    helixParticleSystem.clone = function(particleCount)
    {
        const o = new Helix(particleCount||this.particleCount);
        this._cloneProps(o);
        o.set(this);
        return o;
    };

    this.c.promote(Helix, "Container");

};

HelixCanvas.prototype.onResize = function(event)
{
    this.log("HelixCanvas.onResize");

    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.max = Math.max(this.w, this.h);
    this.min = Math.min(this.w, this.h);
    this.target.width = this.w;
    this.target.height = this.h;

    this.stage.updateViewport(this.w, this.h);
    for (let i = 0; i < this.helixes.length; i++)
    {
        this.helixes[i].x = this.w / 2;
        this.helixes[i].y = this.h / 2;
    }
    this.particleScale = this.min / 1000 * 0.3;
    this.stage.update();
}

HelixCanvas.prototype.setupHelix = function() {

    this.log("HelixCanvas.setupHelix");

    this.stage = new this.c.StageGL(this.targetName, { transparent: false });
    this.stage.tickChildren = false;
    this.stage.setClearColor(this.stageColor);

    // created by StageGL
    this.target = target;

    this.spriteSheet = this.generateSpriteSheet();

    let helix;

    helix = this.stage.addChild(new Helix(this.backgroundBubble01));
    helix.x = this.w / 2;
    helix.y = this.h / 2;
    helix.speed = 0.1;
    helix.alpha = 0.1;
    helix.particleScale = 5;
    helix.altAmplitude = 1.6;
    helix.amplitude = 0.6;
    helix.rotations = 3;
    this.helixes.push(helix);

    helix = this.stage.addChild(helix.clone(this.backgroundBubble02));
    helix.particleScale = 3;
    helix.rotation = -20;
    helix.speed = -0.5;
    helix.amplitude = 0.1;
    helix.altAmplitude = 2;
    helix.alpha = 0.3;
    this.helixes.push(helix);

    helix = this.stage.addChild(new Helix(this.backgroundBubble03));
    helix.x = this.w / 2;
    helix.y = this.h / 2;
    helix.amplitude = 0.4;
    helix.particleScale = 0.2;
    helix.rotation = -40;
    helix.rotations = 2.5;
    helix.speed = 2;
    helix.startRotation = 0.33;
    this.helixes.push(helix);

    helix = this.stage.addChild(helix.clone());
    helix.startRotation = 0.83;
    this.helixes.push(helix);

    helix = this.stage.addChild(helix.clone(this.backgroundBubble04));
    helix.particleScale = 0.1;
    helix.speed = -3;
    this.helixes.push(helix);

    helix = this.stage.addChild(helix.clone());
    helix.startRotation = 0.33;
    this.helixes.push(helix);

    this.c.Ticker.timingMode = this.c.Ticker.RAF;

    this.onResize = this.onResize.bind(this);
    window.addEventListener("resize", this.onResize);
    this.onResize();

    this.onParticleTicker = this.c.Ticker.on("tick", this.tick, this);
};

HelixCanvas.prototype.generateSpriteSheet = function()
{
    let ref = this;

    // generates a 4x4 sheet of dots at different blur levels.
    const holder = new this.c.Container();
    holder.addChild(new this.c.Shape());

    const pow = Math.ceil(Math.log(this.dotSize * 2.2) / Math.log(2));
    const size2 = Math.pow(2, pow);
    const rect = new this.c.Rectangle(-size2 / 2, -size2 / 2, size2, size2);

    const builder = new this.c.SpriteSheetBuilder();
    builder.padding = 0;
    builder.maxWidth = Math.ceil(Math.sqrt(this.blurLevels)) * size2;

    for (let i = 0; i < this.blurLevels; i++)
    {
        builder.addFrame(holder, rect, 1, function(holder, i)
        {
            let shape = holder.getChildAt(0);
            const g = shape.graphics;
            const m = i / ref.blurLevels;
            const r = ref.dotSize / 2 * Math.pow(2 - m, 1.2);
            const x = 0 * (1 - m) * 0.2 * r;

            g.c().rf(["hsla("+(m*120+190)+",100%,95%,1)",ref.dotHSLA],[m*0.1+0.1,1],x,0,0,x,0,r).dc(0,0,r);
            shape.alpha = 0.3 + 0.7 * m;
        }, i);
    }
    return builder.build();
};

HelixCanvas.prototype.tick = function(evt)
{
    const d = evt.delta;

    for (let i = 0, l = this.helixes.length; i < l; i++) { this.helixes[i].tick(d); }

    this.stage.update();
};

HelixCanvas.prototype.rnd = function(min, max)
{
    if (max === undefined) { max = min; min = 0; }
    return Math.random() * (max - min) + min;
};

HelixCanvas.prototype.destroy = function() {

    this.log("destroy.stage", this.stage);

    window.removeEventListener('resize', this.onResize);

    this.c.Ticker.off("tick", this.onParticleTicker);
    this.stage.removeAllChildren();
    this.stage.removeAllEventListeners();
    this.stage.enableDOMEvents(false);
    this.stage.update();
};


/* HelixParticle */
export function HelixParticle(spriteSheet) {

    this.Sprite_constructor(spriteSheet);
    this.t = 0;
    this.speed = 1;
    this.size = 1;
    this.altAmp = 1;
    this.altPer = 1;

}

/* Helix */
export function Helix(particleCount) {
    this.Container_constructor();
    this.particleCount = particleCount||1000;

    this.set({});
    this.particles = [];
    this.createParticles();
}