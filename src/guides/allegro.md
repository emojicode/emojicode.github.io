# The Cookie Monster Game

This chapter introduces you to the basics of writing a simple game with the
allegro package, which ships with Emojicode. This guide assumes that you have
have a basic knowledge of object-oriented programming and have read
[Compile and Run Your First Program](compile-and-run.html).

## Creating an app

First of all we need to important the allegro package:

```
📦 allegro 🔴
```

This makes all types from the *allegro* package available in the namespace 🔴
(of our package, which by definition is *_*), i.e. we can access all classes
provided by the allegro package from our application.

Next we need to startup the application, so we’ll create the 🏁 function:

```
🏁 🍇
  🍩🙋🏔 🍇

  🍉
🍉
```

As you’ve seen, there’s already some code in the 🏁 function. `🍩🙋🏔` is a
type method call. This means we call a method (🙋) directly on a type (🏔).
There’s one more thing to notice: the following code block. This code block
creates a closure. Closures are kind of functions that capture the context in
which they were created. Closures are a special kind of callables. *Callables*
is what the type of values that can be executed are called in Emojicode.

So what is this good for? The 🙋 type method of the 🏔 class, which is provided
by the allegro package, is really important as it initiates the application in
such a way that it can display windows, receive events and play sounds. This
method normally doesn’t return but instead calls the given callable in an
appropriate way.

To recap: Call this class method, provide it with a callable and setup the
application from there.

We’ll do so by creating a 📺 instance. A 📺 instance (say *display*) is
responsible for displaying graphics on the computers screen. On many operating
systems a 📺 will be represented by a window.

📺 provides a single initializer:

<pre class="declaration">
🍬 🐈 🆕 width <a href="../s/t5535756962.html">🚂</a> height <a href="../s/t5535756962.html">🚂</a>
</pre>

You may have noticed the 🍬 in front of the 🐈. 🍬 indicates that this
initializer may return Nothingness. Our code to get a display is therefore:

```
🍦 display 🍺🔷📺🆕 1000 1000
```

Please note that we skipped error checking for the moment and just unwrapped
the optional with 🍺 here. That’s not a really good idea but we’ll leave it
like that because it keeps the sample code shorter (and it’s long enough).

Now that we’ve a 📺 instance we can configure it. We’ll set its title:

```
🏷 display 🔤Cookie Monster Game🔤
```

That’s good moment to test if things are working so far. If we however compiled
and ran this program know we wouldn’t see much due to the fact that program
would create a display and immediately terminate. So we’ll tell it to wait
for a few seconds after the display was created:

```
🍩⏳💈 10
```

Save the file, compile it and run it. You should see something similar to this:

<img src="/docs/static/img/cookiemonster1.png" width="300">

Not very impressive, is it? Let’s do something more interesting and draw some
cookies onto the screen. [Download](https://github.com/emojicode/cookie-monster
-game/raw/master/cookie.png) a cookie image from here, copy it into the
same directory as the program.

In order to display the image on the screen, it must be loaded as a bitmap
first. Fortunately there’s a 🖼 - that’s the bitmap class – initializer that
can exactly do that. It’s called 📄 takes a path to the image and is also marked
with 🍬 – it will return Nothingness if the path is invalid or the given file
is not an image. Still believing we live in a fail-safe, we skip error checking
once again:

```
🍦 cookieBmp 🍺🔷🖼📄 🔤cookie.png🔤
```

Now that we’ve the bitmap, we’ll draw it onto the screen:

```
🍩🚿🏔 🔷🎨🆕 255 255 255 255
🍩📼🏔 cookieBmp 500 500
🍩🎦🏔️
```

Make sure you place this code *before* `🍩⏳💈 10` or you won’t see everything.
If everything goes well, you should see a tasty cookie in the center of the
display in front of a white background.

Wondering what’s going on ’cause that’s a bunch of strange type method calls?
Well, these are a strange bunch of type method calls but these are all very
important drawing functions. And they all have one thing in common: They are
type methods and draw to the current drawing target. By creating a display
we’ve created a drawing target which was then also set as the current drawing
target.

The 🚿 type method fills the entire drawing target with the given color which
was here created by providing RGBA values. The 📼 method then draws a bitmap
at the specified coordinates. Last but not least the 🎦 makes all changes
visible: Everything you draw is drawn in a backbuffer first and gets visible
once you call the 🎦 method.

Let’s extend our code to also show the cookie monster ([download](
https://github.com/emojicode/cookie-monster-game/raw/master/cookie_monster.png)
 here)
and a additional cookie:

```
📦 allegro 🔴

🏁 🍇
  🍩🙋🏔 🍇
    🍦 display 🍺🔷📺🆕 1000 1000
    🏷 display 🔤Cookie Monster Game🔤

    🍦 cookieBmp 🍺🔷🖼📄 🔤cookie.png🔤
    🍩🚿🏔 🔷🎨🆕 255 255 255 255
    🍩📼🏔 cookieBmp 500 500
    🍩📼🏔 cookieBmp 200 400 👴 The Cookie Monster can never get enough cookies

    🍦 monster 🍺🔷🖼📄 🔤cookie_monster.png🔤
    🍩📼🏔 monster 200 200

    🍩🎦🏔️

    🍩⏳💈 10
  🍉
🍉
```

Running this should result in something similar to this:

<img src="/docs/static/img/cookiemonster2.png" width="300">

## Power to the classes

Everything works, but frankly, it’s not really future-proof code. Emojicode
is an object-oriented language, so everything would be much better with classes.

First of all, let us create a 🦁 class that represents the Cookie Monster:

```
🐇 🦁 🍇
  🍰 x 🚀
  🍰 y 🚀
  🍰 monster 🖼

  🐈 🆕 🍇
    🍮 x 500
    🍮 y 500
    🍮 monster 🍺🔷🖼📄 🔤cookie_monster.png🔤
  🍉

  🐖 🖌 🍇
    🍩📼🏔 monster x y
  🍉
🍉
```

This is a very basic class. It has three instance variables: `x` and `y` that
hold the position of the Cookie Monster and `bitmap` that holds the bitmap.
The initializer sets the initial position of the monster to (500, 500) and loads
the bitmap. Also, the cookie monster has a method draw itself: 🖌.

Next, here’s a class for cookies:

```
🐇 🍪 🍇
  🍰 cookie 🖼
  🍰 x 🚀
  🍰 y 🚀

  🐈 🆕 _x 🚀 _y 🚀 _cookie 🖼  🍇
    🍮 x _x
    🍮 y _y
    🍮 cookie _cookie
  🍉

  🐖 🖌 🍇
    🍩📼🏔 cookie x y
  🍉
🍉
```

There’s a difference to the 🦁 class: 🍪🆕 takes a bitmap argument and
coordinates. The reason for this is that we want to create multiple cookies
later on and they should, of course, share the same bitmap and have different
positions. For this reason we’ll instantiate the bitmap once and pass it to all
🍪 instances.

So let’s update the 🏁 function to use the new classes:

```
🏁 🍇
  🍩🙋🏔 🍇
    🍦 display 🍺🔷📺🆕 1000 1000
    🏷 display 🔤Cookie Monster Game🔤

    🍦 cookieBmp 🍺🔷🖼📄 🔤cookie.png🔤 👴 Load the cookie bitmap

    🍦 cookies 🔷🍨🐚🍪🐸
    🔂 i ⏩ 0 10 🍇 👴 Create 10 randomly placed cookies
      🐻 cookies 🔷🍪🆕 🚀🔷🚂🎰 50 900 🚀🔷🚂🎰 50 900 cookieBmp
    🍉

    🍦 monster 🔷🦁🆕 👴 Instantiate a monster

    🍩🚿🏔 🔷🎨🆕 255 255 255 255
    🖌 monster 👴 Draw the monster
    🔂 cookie cookies 🍇 👴 Draw all cookies
      🖌 cookie
    🍉

    🍩🎦🏔️

    🍩⏳💈 10
  🍉
🍉
```

As you can see we didn’t just replace the drawing calls but also introduced
a 🍨 `cookies` which stores ten randomly placed cookie objects.
`🔷🚂🎰 50 900` generates a random integer between 50 and 900 which is then
converted into a 🚀 with 🚂’s 🚀 method. Later on this 🍨 is iterated and
the 🖌 is called on each cookie.

If you run the program you’ll see something similar to this:

<img src="/docs/static/img/cookiemonster3.png" width="300">

## Check out that event

Everything is working fine so far but it’s not a game yet. We need to grant the
user a bit of control over the game. In order to achieve this we need to
instantiate an *event queue* which is constantly queried for events.

First, create the event queue:

```
🍦 queue 🔷🗃🆕
⌨️ queue
```

The code above creates an event queue and registers the keyboard as an event
source for that queue. Next, a loop which constantly queries the event queue
for an event. Such a loop is often referred to as *the run loop*:

```
🔁 👍 🍇
  🍦 event ⏳ queue

🍉
```

The ⏳ method of ⏳ waits for an event to occur and returns it. So the next
thing is to classify the event and handle it appropriately. Since we want the
Cookie Monster to be movable with the arrow keys we need to check for a key-down
event and then check in which direction that Cookie Monster should move.

```
🍊🍦 keyboardEvent 🔲 event 📩 🍇
  🍊 😛📟 keyboardEvent 84 🍇
    ⬆️ monster
  🍉
  🍋 😛📟 keyboardEvent 85 🍇
    ⬇️ monster
  🍉
  🍋 😛📟 keyboardEvent 82 🍇
    ⬅️ monster
  🍉
  🍋 😛📟 keyboardEvent 83 🍇
    ➡️ monster
  🍉
🍉
```

Let’s walk through this code: The first line tries to cast `event` to `📩`, a
key press event. Then we determine which keycode was associated with this event.
84 stands for arrow up, 85 for arrow down, 82 for arrow left and 83 for arrow
right. According to these direction, methods get called on `monster`. And yes,
we have yet to implement them in 🦁:

```
🐖 ⬇️ 🍇
  🍮 y ➕ y 10
🍉

🐖 ⬆️ 🍇
  🍮 y ➖ y 10
🍉

🐖 ⬅️ 🍇
  🍮 x ➖ x 10
🍉

🐖 ➡️ 🍇
  🍮 x ➕ x 10
🍉
```

This methods obviously just change the coordinates to move the monster
accordingly. So there’s just one step left, before you can control the Cookie
Monster with the arrow keys. We need to redraw the game in the run loop, i.e.
we need to draw everything all over again to make the changes to the Cookie
Monster visible:

```
🏁 🍇
  🍩🙋🏔 🍇
    🍦 display 🍺🔷📺🆕 1000 1000
    🏷 display 🔤Cookie Monster Game🔤

    🍦 cookieBmp 🍺🔷🖼📄 🔤cookie.png🔤

    🍦 cookies 🔷🍨🐚🍪🐸
    🔂 i ⏩ 0 10 🍇
      🐻 cookies 🔷🍪🆕 🚀🔷🚂🎰 50 900 🚀🔷🚂🎰 50 900 cookieBmp
    🍉

    🍦 monster 🔷🦁🆕

    🍦 queue 🔷🗃🆕
    ⌨️ queue
    🔁 👍 🍇
      🍩🚿🏔 🔷🎨🆕 255 255 255 255
      🖌 monster
      🔂 cookie cookies 🍇
        🖌 cookie
      🍉
      🍩🎦🏔️

      🍦 event ⏳ queue

      🍊🍦 keyboardEvent 🔲 event 📩 🍇
        🍊 😛📟 keyboardEvent 84 🍇
          ⬆️ monster
        🍉
        🍋 😛📟 keyboardEvent 85 🍇
          ⬇️ monster
        🍉
        🍋 😛📟 keyboardEvent 82 🍇
          ⬅️ monster
        🍉
        🍋 😛📟 keyboardEvent 83 🍇
          ➡️ monster
        🍉
      🍉
    🍉
  🍉
🍉
```

The 🏁 function should now look like above. Note, that we’ve also dropped the
delay at the end of the initializer – it’s no longer needed.

You can now control the monster with your keyboard!

## Me want eat cookies

So far, so good. But actually the Cookie Monster wants to the eat the cookies
and not just to walk underneath them. In order to achieve this, we need to add
two methods to the 🦁 class that return the current coordinates of the mouth of
Cookie Monster:

```
🐖 👉️ ➡️ 🚀 🍇
  🍎 ➕ x 60
🍉

🐖 👇 ➡️ 🚀 🍇
  🍎 ➕ y 70
🍉
```

That’s really nothing special. Since the coordinates stored in the `x` and `y`
variables point to the top left of the cookie monster, 60 and 70 get added so
that the returned coordinates point to the center of the mouth.

We’ll now replace 🍪’s 🖌 method by a much more advanced method:

```
🐖 🖊 monsterX 🚀 monsterY 🚀 ➡️ 👌 🍇
  🍊 🎊🎊➡️ monsterX x ⬅️ monsterX ➕ x 50 🎊➡️ monsterY y ⬅️ monsterY ➕ y 50 🍇
    🍎 👍
  🍉
  🍩📼🏔 cookie x y
  🍎 👎
🍉
```

Evidently, this method takes two arguments which are the location of the Cookie
Monster, or more specifically, its mouth. The next line might be a bit more
difficult to understand. It compares whether the coordinate of the Cookie
Monster‘s mouth are within the cookie. If that‘s the case the method immediately
returns 👍, otherwise the cookie is drawn as usual and 👎 is returned.

Clearly, we now also need to update our loop to draw cookies:

```
🍦 iterator 🍡 cookies
🔂 cookie iterator 🍇
  🍊 🖊 cookie 👉️ monster 👇 monster 🍇
    🚯 iterator
  🍉
🍉
```

The code above is really straightforward. `cookies` is asked for an 🍡 (iterator)
to which a reference is then stored in `iterator`. Then this iterator is used
with the 🔂 loop to get each cookie. 🖊 is called on each cookie and the
coordinates of the monster, which we can get from the new 👉️👇 methods, are
passed. If the 🖊 method returns true, this means the Cookie Monsters mouth
touched the cookie, the 🚯 method is called on the iterator, which removes the
current element from the array. (That’s the reason why we explicitly asked for
an 🍡.)

Try running the game now! The Cookie Monster will be happy to eat the cookies.

## Scores

Cool game, isn’t it? But it would be nice if there was a counter showing how
many cookies there are still left, wouldn’t it? And probably a special screen
when the game is finished?

To recap: We want to display some text. And therefore we need a font.
[Download a cool font here](https://github.com/emojicode/cookie-
monster-game/raw/master/Monoton-Regular.ttf) and put
it into the same directory as `cookie.emojic`.

Now we can load that font (and you should do this before the run loop):

```
🍦 font 🍺🔷🕉📄 🔤Monoton-Regular.ttf🔤 63
```

The same disclaimer applies again: Don’t skip error checking although we do it
here for shortness. `🔷🕉📄` instantiates a new instance of 🕉, which
represents the font. The two arguments are the path to the font and the size
of the font.

In the run loop we’ll draw the number of cookies left:

```
🍩🔡🏔 font 🔷🎨🆕 0 0 0 255 990 10 🔡 🐔 cookies 10 🔷⚖➡️
```

Place this code before `🍩🎦🏔️`. `🍩🔡🏔` draws a text using the given font.
The signature of this method is:

<pre class="declaration">🐇🐖 🔡 font <a href="../allegro/t5535756649.html">🕉</a> color <a href="../allegro/t5535657256.html">🎨</a> x <a href="../s/t5535756960.html">🚀</a> y <a href="../s/t5535756960.html">🚀</a> text <a href="../s/t5535756609.html">🔡</a> align <a href="../allegro/t9878NaN.html">⚖</a> ➡️ ✨</pre>

Quite a lot of arguments. Most things should be pretty clear. `align` is a ⚖,
an enum, which specifies how the text should be aligned. In our example we used
🔷⚖➡️ to align the text to the right, i.e. the top right corner of the text will
always be at the coordinates passed to `x` and `y`.

If you try the game now you’ll see a counter in the top right showing how many
cookies are left.

As mentioned before, a screen at the end of the game would be nice:

```
🍊 😛 🐔 cookies 0 🍇 👴 No cookies left!
  🍩🚿🏔 🔷🎨🆕 4 115 187 255
  🍩🔡🏔 font 🔷🎨🆕 255 255 255 255 500 500 🔤Well done!🔤 🔷⚖↔
  🍩🎦🏔️

  🔁 👍 🍇 👴 Custom run loop to wait for the exit command "q"
    🍦 event ⏳ queue
    🍊🍦 keyboardEvent 🔲 event 📩 🍇
      🍊 🍦 key 🔣 keyboardEvent 🍇
        🍊 😛 key 🔟q 🍇
          🍎 ⚡️
        🍉
      🍉
    🍉
  🍉
  🍎 ⚡️ 👴 Same here
🍉
```

Obviously, this code should be placed after the 🔂 loop for `cookies` and before
querying for new events. Once all cookies have been collected, you’ll see the
following screen:

<img src="/docs/static/img/cookiemonster4.png" width="300">

## The acoustic experience

Our game is missing something really essential: Sound. So go, and grab [this
nice sound](https://github.com/emojicode/cookie-
monster-game/raw/master/sound.wav) and [this sound](https://github.com/
emojicode/cookie-monster-game/raw/master/sound_end.wav) and put them aside
`cookie.emojic`.

The `sound.wav` should be played whenever the Cookie Monster is eating a cookie.
We’ll of course load the file only once and that of course before the run loop.

```
🍦 sample 🍺🔷🎶📄 🔤sound.wav🔤
```

Then let’s add some code to play the sound after a cookie was eaten:

```
🍊 🖊 cookie 👉️ monster 👇 monster 🍇
  🚯 iterator
  🍊 ▶️ 🐔 cookies 0 🍇 👴 This is new!
    🏁 sample 1 0 1
  🍉
🍉
```

This code might need some explanation. We added a 🍊 to check ensure we don’t
play the sound for the last cookie. `🏁 sample 1 0 1` plays the loaded sample
at full volume, no shift towards the left or right and normal speed.

When presenting the “Well done!” screen `sound_end.wav` should be played so
we’ll add the following code:

```
🍦 endSample 🍺🔷🎶📄 🔤sound_end.wav🔤
🏁 endSample 1 0 1
```

The whole program should now look like this:

```
📦 allegro 🔴

🐇 🦁 🍇
  🍰 x 🚀
  🍰 y 🚀
  🍰 monster 🖼

  🐈 🆕 🍇
    🍮 x 500
    🍮 y 500
    🍮 monster 🍺🔷🖼📄 🔤cookie_monster.png🔤
  🍉

  🐖 🖌 🍇
    🍩📼🏔 monster x y
  🍉

  🐖 ⬇️ 🍇
    🍮 y ➕ y 10
  🍉

  🐖 ⬆️ 🍇
    🍮 y ➖ y 10
  🍉

  🐖 ⬅️ 🍇
    🍮 x ➖ x 10
  🍉

  🐖 ➡️ 🍇
    🍮 x ➕ x 10
  🍉

  🐖 👉️ ➡️ 🚀 🍇
    🍎 ➕ x 60
  🍉

  🐖 👇 ➡️ 🚀 🍇
    🍎 ➕ y 70
  🍉
🍉


🐇 🍪 🍇
  🍰 cookie 🖼
  🍰 x 🚀
  🍰 y 🚀

  🐈 🆕 _x 🚀 _y 🚀 _cookie 🖼  🍇
    🍮 x _x
    🍮 y _y
    🍮 cookie _cookie
  🍉

  🐖 🖊 monsterX 🚀 monsterY 🚀 ➡️ 👌 🍇
    🍊 🎊🎊➡️ monsterX x ⬅️ monsterX ➕ x 50 🎊➡️ monsterY y ⬅️ monsterY ➕ y 50 🍇
      🍎 👍
    🍉
    🍩📼🏔 cookie x y
    🍎 👎
  🍉
🍉

🏁 🍇
  🍩🙋🏔 🍇
    🍦 display 🍺🔷📺🆕 1000 1000
    🏷 display 🔤Cookie Monster Game🔤

    🍦 cookieBmp 🍺🔷🖼📄 🔤cookie.png🔤

    🍦 cookies 🔷🍨🐚🍪🐸
    🔂 i ⏩ 0 10 🍇
      🐻 cookies 🔷🍪🆕 🚀🔷🚂🎰 50 900 🚀🔷🚂🎰 50 900 cookieBmp
    🍉

    🍦 sample 🍺🔷🎶📄 🔤sound.wav🔤

    🍦 font 🍺🔷🕉📄 🔤Monoton-Regular.ttf🔤 63
    🍦 monster 🔷🦁🆕

    🍦 queue 🔷🗃🆕
    ⌨️ queue
    🔁 👍 🍇
      🍩🚿🏔 🔷🎨🆕 255 255 255 255
      🖌 monster

      🍦 iterator 🍡 cookies
      🔂 cookie iterator 🍇
        🍊 🖊 cookie 👉️ monster 👇 monster 🍇
          🚯 iterator
          🍊 ▶️ 🐔 cookies 0 🍇
            🏁 sample 1 0 1
          🍉
        🍉
      🍉
      🍩🔡🏔 font 🔷🎨🆕 0 0 0 255 990 10 🔡 🐔 cookies 10 🔷⚖➡️
      🍩🎦🏔

      🍊 😛 🐔 cookies 0 🍇
        🍩🚿🏔 🔷🎨🆕 4 115 187 255
        🍩🔡🏔 font 🔷🎨🆕 255 255 255 255 500 500 🔤Well done!🔤 🔷⚖↔
        🍩🎦🏔️

        🍦 endSample 🍺🔷🎶📄 🔤sound_end.wav🔤
        🏁 endSample 1 0 1

        🔁 👍 🍇
          🍦 event ⏳ queue
          🍊🍦 keyboardEvent 🔲 event 📩 🍇
            🍊 🍦 key 🔣 keyboardEvent 🍇
              🍊 😛 key 🔟q 🍇
                🍎 ⚡️
              🍉
            🍉
          🍉
        🍉
        🍎 ⚡️
      🍉

      🍦 event ⏳ queue

      🍊🍦 keyboardEvent 🔲 event 📩 🍇
        🍊 😛📟 keyboardEvent 84 🍇
          ⬆️ monster
        🍉
        🍋 😛📟 keyboardEvent 85 🍇
          ⬇️ monster
        🍉
        🍋 😛📟 keyboardEvent 82 🍇
          ⬅️ monster
        🍉
        🍋 😛📟 keyboardEvent 83 🍇
          ➡️ monster
        🍉
      🍉
    🍉
  🍉
🍉
```

Well done! We have got a fully-fledge game!
