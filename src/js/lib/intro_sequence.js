import Typed from "typed.js";

export default function IntroTypedSequence(parent)
{
    this.parentModule = parent;             // @Object

    this.introTypedSequence = null;         // @IntroTypedSequence
    this.typedInitSequence = null;          // @Typed
    this.typedInitSequenceB = null;         // @Typed

    this.sequences = [];                    // holds all sequence content
    this.currIndex = 0;                     // current sequence id

    this.initialize();
}

IntroTypedSequence.prototype.initialize = function()
{
    console.log("IntroTypedSequence.initialize");

    let seq = "&nbsp;◿::> imgmount x RAIDPR.IMG > boot . -l x^100\n ";
    seq += "`Drive X mounted as x:::guest::raidpr.img` ^100\n\n ";
    seq += "`Booting from Drive X` ^100\n ";
    seq += "`Starting RAID-OS...` ^100\n ";
    seq += "`HIMEM is testing extended memory` ^100 ";
    seq += "`.` ^10 ";
    seq += "`.` ^10 ";
    seq += "`. done.` ^10\n ";
    seq += "`◿::> SET IRZFX=A220 I5 D1 H1 P330 T6` ^10\n ";
    seq += "`◿::> LH X:\\IRZFX\\DIAGNOSE /S` ^10\n ";
    seq += "`MODE select code function completed` ^10\n\n ";
    seq += "`IRzFx Board is configured at A220 I5 D1 H1.` ^300\n ";


    let seq2 = "&nbsp;Copyright © 2018 IRzFx Computer. Inc. ^500\n ";
    seq2 += "`All rights reserved.` ^100\n\n ";
    seq2 += "`Booting from Drive X` ^100\n ";
    seq2 += "`RAID-OS Version 5.0.1` ^100\n ";

    let seq3 = "&nbsp;\n\n◿::> RUN PROJECT 23 ^300\n ";
    seq3 += "`Init... A220 I5 D1 H1 P330 T6` ^1000\n ";

    let seq4 = "MODIFCATION OF PARAMETERS\nRELATING TO PARTICLE\nACCELERATOR (SYNCHOTRON).^10\n ";
    seq4 += "`E: 23%` ^100\n ";
    seq4 += "`g: .005` ^200\n ";
    seq4 += "`RK: 77.2L` ^200\n ";
    seq4 += "`opt: g+` ^100\n ";
    seq4 += "`Q⋇: ON` ^100\n ";
    seq4 += "`P⧝ : ON` ^100\n\n ";
    seq4 += "`RUN EXPERIMENT ? (Y/N)` ^2000 `Y` ^50 \n ";
    seq4 += "`⧝>` ^300";

    let seq5 = "⧝> _ Phase 0: INJECTION of particles.^10\n ";
    seq5 += "`into synchronization` ^300\n ";

    let seq6 = "⧝> _ Phase 1: particle ACCELERATION. ^750\n ";
    seq6 += "`A N A L Y S I S` ^200\n ";
    seq6 += "`Probability of creating: 91.V %` ^100\n ";
    seq6 += "`NEUTRINO 27: 0.04 %` ^100\n ";
    seq6 += "`⧝> BEGINNING EXPERIMENT` ^2000\n ";

    this.sequences.push(seq);
    this.sequences.push(seq2);
    this.sequences.push(seq3);
    this.sequences.push(seq4);
    this.sequences.push(seq5);
    this.sequences.push(seq6);
};

IntroTypedSequence.prototype.start = function()
{
    this.startInitTypedSequence01();
};

// Initialize OS sequence
IntroTypedSequence.prototype.startInitTypedSequence01 = function()
{
    const ref = this;

    this.currIndex = 0;

    this.typedInitSequence = new Typed(".typed-init-sequence", {
        strings: [this.sequences[this.currIndex]],
        typeSpeed: 40,
        backSpeed: 0,
        cursorChar: '⏶',
        loop: true,
        onLastStringBackspaced: function()
        {
            $("span.typed-cursor").remove();
            ref.typedInitSequence.stop();
            ref.typedInitSequence.destroy();
        },
        onDestroy: function(typed)
        {
            ref.parentModule.startTypedSequenceComplete(ref.currIndex);
            ref.startInitTypedSequence02();
        }
    });
};

// start OS
IntroTypedSequence.prototype.startInitTypedSequence02 = function()
{
    const ref = this;

    this.currIndex = 1;

    this.typedInitSequence = new Typed(".typed-init-sequence", {
        strings: [this.sequences[this.currIndex]],
        typeSpeed: 0,
        backSpeed: 0,
        cursorChar: '⏶',
        loop: false,
        onComplete: function(typed)
        {
            ref.parentModule.startTypedSequenceComplete(ref.currIndex);

            $("span.typed-cursor").remove();
            ref.typedInitSequence.stop();
            ref.startInitTypedSequence03();
        }
    });
};

// start software command
IntroTypedSequence.prototype.startInitTypedSequence03 = function()
{
    const ref = this;

    this.currIndex = 2;

    this.typedInitSequenceB = new Typed(".typed-init-sequence-b", {
        strings: [this.sequences[this.currIndex]],
        typeSpeed: 100,
        backSpeed: 0,
        cursorChar: '⏶',
        loop: false,
        onComplete: function(typed)
        {
            $("span.typed-cursor").remove();
            ref.typedInitSequence.destroy();
            ref.typedInitSequenceB.destroy();
        },
        onDestroy: function(typed)
        {
            ref.parentModule.startTypedSequenceComplete(ref.currIndex);
            ref.startInitTypedSequence04();
        }
    });
};

// run project
IntroTypedSequence.prototype.startInitTypedSequence04 = function()
{
    const ref = this;

    this.currIndex = 3;

    this.typedInitSequence = new Typed(".typed-init-sequence", {
        strings: [this.sequences[this.currIndex]],
        typeSpeed: 0,
        backSpeed: 0,
        cursorChar: '⏶',
        loop: false,
        onComplete: function(typed)
        {
            ref.typedInitSequence.stop();
            ref.typedInitSequence.destroy();
        },
        onDestroy: function(typed)
        {
            ref.parentModule.startTypedSequenceComplete(ref.currIndex);
            ref.startInitTypedSequence05();
        }
    });
};

// analyzing project
IntroTypedSequence.prototype.startInitTypedSequence05 = function()
{
    const ref = this;

    this.currIndex = 4;

    this.typedInitSequence = new Typed(".typed-init-sequence", {
        strings: [this.sequences[this.currIndex]],
        typeSpeed: 0,
        backSpeed: 0,
        cursorChar: '⏶',
        loop: false,
        onComplete: function(typed)
        {
            ref.typedInitSequence.stop();
            ref.typedInitSequence.destroy();
        },
        onDestroy: function(typed)
        {
            ref.parentModule.startTypedSequenceComplete(ref.currIndex);
            ref.startInitTypedSequence06();
        }
    });
};

// begin project
IntroTypedSequence.prototype.startInitTypedSequence06 = function()
{
    const ref = this;

    this.currIndex = 5;

    this.typedInitSequence = new Typed(".typed-init-sequence", {
        strings: [this.sequences[this.currIndex]],
        typeSpeed: 0,
        backSpeed: 0,
        cursorChar: '⏶',
        loop: false,
        onComplete: function(typed)
        {
            ref.typedInitSequence.stop();
            ref.typedInitSequence.destroy();
        },
        onDestroy: function(typed)
        {
            console.log("onInitTypedSequence06Destroy.typed:", typed);

            ref.parentModule.startTypedSequenceComplete(ref.currIndex);
        }
    });
};

IntroTypedSequence.prototype.destroy = function()
{
    this.parentModule = null;               // @Object
    this.typedInitSequence = null;          // @Typed
    this.typedInitSequenceB = null;         // @Typed
};