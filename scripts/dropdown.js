function Dropdown(o)
{
	this.options = o;

	window.getdd = function(elem)
	{
		var id = elem.closest('.dropdown').parentElement.id;
		return window.dropdowns[id];
	}

	this.init = function()
	{
		this.elem = document.getElementById(this.options.id);


		var html =
			`<div class='dropdown'>
    			<div class='dropdown_value'></div>
		          <div class='dropdown_arrow'>Click</div>
		          <div class='dropdown_panel'>
		          	<div class='dropdown_items'></div>
		          </div>
		    </div>`;


	    var self = this;
	    document.addEventListener("mousedown", function() {
	    	if (self.isVisible) self.hide();
	    });

		if (!window.dropdowns) window.dropdowns = {};
		window.dropdowns[this.options.id] = this;

    this.elem.style.display = 'inline-block';

		this.elem.innerHTML = html;
		var elem = this.elem;
		this.items = elem.querySelector(".dropdown_items");
		this.value = elem.querySelector(".dropdown_value");


		this.panel = elem.querySelector(".dropdown_panel");
		this.arrow = elem.querySelector(".dropdown_arrow");


		var self = this;
		this.value.innerHTML = this.options.val;


		var data = this.options.data;
		var html = "";
		data.forEach(function(elem)
		{
			html += `<div class='dropdown_item' onmousedown='var self=getdd(this);self.clicked(this)'>${elem}</div>`;
		});
		this.items.innerHTML = html;

		this.elem.addEventListener('mousedown', function()
		{
			event.stopPropagation();

			if (self.isVisible)
				self.hide();
			else
				self.show();

		});


	}

	this.clicked = function(elem)
	{
	  	event.stopPropagation();
	    this.hide();

		var newval = elem.innerHTML;
		this.value.innerHTML = newval;

		if (this.options.cb)
			this.options.cb(newval);

	}


	this.show = function()
	{
  	for (var dd in window.dropdowns)
    	window.dropdowns[dd].hide();

		this.isVisible = true;
		this.items.style.transform = 'translate(0px,0px)';
		this.arrow.style.transform = 'rotate(180deg)';
	}


	this.hide = function()
	{
  	if (!this.items) return;

		this.isVisible = false;
		this.items.style.transform = 'translate(0px,-255px)';
		this.arrow.style.transform = 'rotate(0deg)';
	}

	this.init();
	return this;
}

var dd = new Dropdown(
{
	id: 'content',
	val: 'cat',
	data: ['cat', 'dog', 'mouse', 'horse', 'rabbit','lion','bear','tiger'],
	cb: function (newval)
	{
		//alert(newval);
	}
});

var dd2 = new Dropdown(
{
	id: 'dd2',
	val: 'dog',
	data: ['cat', 'dog', 'mouse', 'horse', 'rabbit','lion','bear','tiger'],
	cb: function (newval)
	{
		//alert(newval);
	}
});
