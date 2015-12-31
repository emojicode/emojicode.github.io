class EmojiExample

	list: [
		{img: "1f36b", html: "The chocolate bar increments a value. In any other language you would write <code>i++</code>. How boring!"}
		{img: "1f36e", html: "Manage variables with ease: Automatic declarations and no crude syntax to access instance variables!"}
		{img: "1f4e6", html: "And this loads a package. Very intuitive, isn’t it? (There’s an impressive package system.)"}
		{img: "1f37a", html: "A powerful concept to avoid mistakes: Optionals!"}
		{img: "1f407", html: "You like cute little rabbits and powerful fast classes. Any questions?"}
		{img: "2712", html: "Overriding is fun and secure. Me more specific or more general, just do not break promises."}
	]
	i: 0

	constructor: ->
		@heContainer = document.getElementById("he-container")
		@heImg = document.getElementById("he-img-container")
		@heText = document.getElementById("he-text")
		@next()
		@interval = setInterval(
      => @next()
    , 4600)

	next: ->
		@i = 0 if @i == @list.length

		@heContainer.classList.add "out"

		setTimeout =>
			xhr = new XMLHttpRequest
			xhr.onreadystatechange = =>
				if xhr.readyState == 4
					@heImg.innerHTML = "#{xhr.responseText}"

			xhr.open('GET', "img/#{@list[@i].img}.svg", true);
			xhr.send(null);
		, 410

		setTimeout =>
			@heText.innerHTML = @list[@i].html
			@heContainer.classList.remove "out"
			@i++
		, 860

setTimeout ->
	new EmojiExample
, 100
