
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function get_binding_group_value(group, __value, checked) {
        const value = new Set();
        for (let i = 0; i < group.length; i += 1) {
            if (group[i].checked)
                value.add(group[i].__value);
        }
        if (!checked) {
            value.delete(__value);
        }
        return Array.from(value);
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function select_option(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
        select.selectedIndex = -1; // no option should be selected
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked') || select.options[0];
        return selected_option && selected_option.__value;
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.48.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/App.svelte generated by Svelte v3.48.0 */

    const file = "src/App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[18] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[18] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[23] = list[i].row;
    	child_ctx[4] = i;
    	return child_ctx;
    }

    function get_each_context_3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[25] = list[i];
    	child_ctx[27] = i;
    	return child_ctx;
    }

    // (44:3) {#each Array(columns) as _, column}
    function create_each_block_3(ctx) {
    	let label;
    	let input;
    	let t0;
    	let t1_value = /*availableTickets*/ ctx[8][/*i*/ ctx[4] * 14 + /*column*/ ctx[27]] + "";
    	let t1;
    	let t2;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			label = element("label");
    			input = element("input");
    			t0 = space();
    			t1 = text(t1_value);
    			t2 = text("       ");
    			attr_dev(input, "type", "checkbox");
    			input.__value = /*availableTickets*/ ctx[8][/*i*/ ctx[4] * 14 + /*column*/ ctx[27]];
    			input.value = input.__value;
    			/*$$binding_groups*/ ctx[11][0].push(input);
    			add_location(input, file, 45, 5, 1063);
    			attr_dev(label, "class", "svelte-1bs1kn9");
    			add_location(label, file, 44, 4, 1050);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			append_dev(label, input);
    			input.checked = ~/*chosenSeats*/ ctx[0].indexOf(input.__value);
    			append_dev(label, t0);
    			append_dev(label, t1);
    			append_dev(label, t2);

    			if (!mounted) {
    				dispose = listen_dev(input, "change", /*input_change_handler*/ ctx[10]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*chosenSeats*/ 1) {
    				input.checked = ~/*chosenSeats*/ ctx[0].indexOf(input.__value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			/*$$binding_groups*/ ctx[11][0].splice(/*$$binding_groups*/ ctx[11][0].indexOf(input), 1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_3.name,
    		type: "each",
    		source: "(44:3) {#each Array(columns) as _, column}",
    		ctx
    	});

    	return block;
    }

    // (42:1) {#each rows as { row }
    function create_each_block_2(ctx) {
    	let div;
    	let each_value_3 = Array(/*columns*/ ctx[6]);
    	validate_each_argument(each_value_3);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_3.length; i += 1) {
    		each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(div, file, 42, 2, 1001);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*availableTickets, chosenSeats*/ 257) {
    				each_value_3 = Array(/*columns*/ ctx[6]);
    				validate_each_argument(each_value_3);
    				let i;

    				for (i = 0; i < each_value_3.length; i += 1) {
    					const child_ctx = get_each_context_3(ctx, each_value_3, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_3.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(42:1) {#each rows as { row }",
    		ctx
    	});

    	return block;
    }

    // (57:3) {#each snacks as snack}
    function create_each_block_1(ctx) {
    	let option;
    	let t0_value = /*snack*/ ctx[18].text + "";
    	let t0;
    	let t1;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t0 = text(t0_value);
    			t1 = space();
    			option.__value = option_value_value = /*snack*/ ctx[18];
    			option.value = option.__value;
    			add_location(option, file, 57, 4, 1559);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t0);
    			append_dev(option, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*snacks*/ 2 && t0_value !== (t0_value = /*snack*/ ctx[18].text + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*snacks*/ 2 && option_value_value !== (option_value_value = /*snack*/ ctx[18])) {
    				prop_dev(option, "__value", option_value_value);
    				option.value = option.__value;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(57:3) {#each snacks as snack}",
    		ctx
    	});

    	return block;
    }

    // (78:2) {#each snacks as snack}
    function create_each_block(ctx) {
    	let li;
    	let t0_value = /*snack*/ ctx[18].text + "";
    	let t0;
    	let t1;
    	let t2_value = /*snack*/ ctx[18].count + "";
    	let t2;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t0 = text(t0_value);
    			t1 = text(": ");
    			t2 = text(t2_value);
    			attr_dev(li, "class", "svelte-1bs1kn9");
    			add_location(li, file, 78, 3, 1951);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t0);
    			append_dev(li, t1);
    			append_dev(li, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*snacks*/ 2 && t0_value !== (t0_value = /*snack*/ ctx[18].text + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*snacks*/ 2 && t2_value !== (t2_value = /*snack*/ ctx[18].count + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(78:2) {#each snacks as snack}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let div;
    	let h10;
    	let t1;
    	let img;
    	let img_src_value;
    	let t2;
    	let h20;
    	let t4;
    	let h11;
    	let t6;
    	let t7;
    	let h21;
    	let t8;
    	let t9_value = /*chosenSeats*/ ctx[0].length + "";
    	let t9;
    	let t10;
    	let t11_value = 112 - /*chosenSeats*/ ctx[0].length + "";
    	let t11;
    	let t12;
    	let t13;
    	let h22;
    	let t15;
    	let form;
    	let select;
    	let t16;
    	let h4;
    	let t18;
    	let input;
    	let t19;
    	let button;
    	let t20;
    	let button_disabled_value;
    	let t21;
    	let p;
    	let t22;

    	let t23_value = (/*selected*/ ctx[2]
    	? /*answer*/ ctx[3] + ' ' + /*selected*/ ctx[2].text + '(s)'
    	: '[waiting...]') + "";

    	let t23;
    	let t24;
    	let h12;
    	let t26;
    	let ul;
    	let li;
    	let t27;
    	let t28_value = /*chosenSeats*/ ctx[0].length + "";
    	let t28;
    	let t29;
    	let mounted;
    	let dispose;
    	let each_value_2 = /*rows*/ ctx[7];
    	validate_each_argument(each_value_2);
    	let each_blocks_2 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_2[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	let each_value_1 = /*snacks*/ ctx[1];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let each_value = /*snacks*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			main = element("main");
    			div = element("div");
    			h10 = element("h1");
    			h10.textContent = "Doctor Strange in the Multiverse of Madness";
    			t1 = space();
    			img = element("img");
    			t2 = space();
    			h20 = element("h2");
    			h20.textContent = "Click the tickets you want to buy!";
    			t4 = space();
    			h11 = element("h1");
    			h11.textContent = "*Screen*";
    			t6 = space();

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].c();
    			}

    			t7 = space();
    			h21 = element("h2");
    			t8 = text("Currently, ");
    			t9 = text(t9_value);
    			t10 = text(" tickets have been purchased. There are ");
    			t11 = text(t11_value);
    			t12 = text(" open seats.");
    			t13 = space();
    			h22 = element("h2");
    			h22.textContent = "Snack Order";
    			t15 = space();
    			form = element("form");
    			select = element("select");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t16 = space();
    			h4 = element("h4");
    			h4.textContent = "How many?";
    			t18 = space();
    			input = element("input");
    			t19 = space();
    			button = element("button");
    			t20 = text("Submit");
    			t21 = space();
    			p = element("p");
    			t22 = text("Selected ");
    			t23 = text(t23_value);
    			t24 = space();
    			h12 = element("h1");
    			h12.textContent = "Total Sales:";
    			t26 = space();
    			ul = element("ul");
    			li = element("li");
    			t27 = text("Tickets: ");
    			t28 = text(t28_value);
    			t29 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h10, "class", "svelte-1bs1kn9");
    			add_location(h10, file, 36, 2, 796);
    			if (!src_url_equal(img.src, img_src_value = /*src*/ ctx[5])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Multiverse of Madness Image");
    			attr_dev(img, "class", "svelte-1bs1kn9");
    			add_location(img, file, 37, 2, 851);
    			add_location(h20, file, 38, 2, 899);
    			add_location(div, file, 35, 1, 788);
    			attr_dev(h11, "class", "svelte-1bs1kn9");
    			add_location(h11, file, 40, 1, 953);
    			add_location(h21, file, 51, 1, 1273);
    			add_location(h22, file, 52, 1, 1393);
    			if (/*selected*/ ctx[2] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[12].call(select));
    			add_location(select, file, 55, 2, 1465);
    			add_location(h4, file, 63, 1, 1639);
    			attr_dev(input, "type", "number");
    			add_location(input, file, 65, 1, 1660);
    			button.disabled = button_disabled_value = !/*answer*/ ctx[3];
    			attr_dev(button, "type", "submit");
    			add_location(button, file, 67, 1, 1704);
    			add_location(p, file, 71, 1, 1766);
    			attr_dev(h12, "class", "svelte-1bs1kn9");
    			add_location(h12, file, 73, 1, 1851);
    			attr_dev(li, "class", "svelte-1bs1kn9");
    			add_location(li, file, 76, 2, 1883);
    			add_location(ul, file, 75, 1, 1876);
    			add_location(form, file, 54, 1, 1416);
    			attr_dev(main, "class", "svelte-1bs1kn9");
    			add_location(main, file, 34, 0, 780);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div);
    			append_dev(div, h10);
    			append_dev(div, t1);
    			append_dev(div, img);
    			append_dev(div, t2);
    			append_dev(div, h20);
    			append_dev(main, t4);
    			append_dev(main, h11);
    			append_dev(main, t6);

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].m(main, null);
    			}

    			append_dev(main, t7);
    			append_dev(main, h21);
    			append_dev(h21, t8);
    			append_dev(h21, t9);
    			append_dev(h21, t10);
    			append_dev(h21, t11);
    			append_dev(h21, t12);
    			append_dev(main, t13);
    			append_dev(main, h22);
    			append_dev(main, t15);
    			append_dev(main, form);
    			append_dev(form, select);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(select, null);
    			}

    			select_option(select, /*selected*/ ctx[2]);
    			append_dev(form, t16);
    			append_dev(form, h4);
    			append_dev(form, t18);
    			append_dev(form, input);
    			set_input_value(input, /*answer*/ ctx[3]);
    			append_dev(form, t19);
    			append_dev(form, button);
    			append_dev(button, t20);
    			append_dev(form, t21);
    			append_dev(form, p);
    			append_dev(p, t22);
    			append_dev(p, t23);
    			append_dev(form, t24);
    			append_dev(form, h12);
    			append_dev(form, t26);
    			append_dev(form, ul);
    			append_dev(ul, li);
    			append_dev(li, t27);
    			append_dev(li, t28);
    			append_dev(ul, t29);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			if (!mounted) {
    				dispose = [
    					listen_dev(select, "change", /*select_change_handler*/ ctx[12]),
    					listen_dev(select, "change", /*change_handler*/ ctx[13], false, false, false),
    					listen_dev(input, "input", /*input_input_handler*/ ctx[14]),
    					listen_dev(form, "submit", prevent_default(/*handleSubmit*/ ctx[9]), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*Array, columns, availableTickets, chosenSeats*/ 321) {
    				each_value_2 = /*rows*/ ctx[7];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks_2[i]) {
    						each_blocks_2[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_2[i] = create_each_block_2(child_ctx);
    						each_blocks_2[i].c();
    						each_blocks_2[i].m(main, t7);
    					}
    				}

    				for (; i < each_blocks_2.length; i += 1) {
    					each_blocks_2[i].d(1);
    				}

    				each_blocks_2.length = each_value_2.length;
    			}

    			if (dirty & /*chosenSeats*/ 1 && t9_value !== (t9_value = /*chosenSeats*/ ctx[0].length + "")) set_data_dev(t9, t9_value);
    			if (dirty & /*chosenSeats*/ 1 && t11_value !== (t11_value = 112 - /*chosenSeats*/ ctx[0].length + "")) set_data_dev(t11, t11_value);

    			if (dirty & /*snacks*/ 2) {
    				each_value_1 = /*snacks*/ ctx[1];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty & /*selected, snacks*/ 6) {
    				select_option(select, /*selected*/ ctx[2]);
    			}

    			if (dirty & /*answer*/ 8 && to_number(input.value) !== /*answer*/ ctx[3]) {
    				set_input_value(input, /*answer*/ ctx[3]);
    			}

    			if (dirty & /*answer*/ 8 && button_disabled_value !== (button_disabled_value = !/*answer*/ ctx[3])) {
    				prop_dev(button, "disabled", button_disabled_value);
    			}

    			if (dirty & /*selected, answer*/ 12 && t23_value !== (t23_value = (/*selected*/ ctx[2]
    			? /*answer*/ ctx[3] + ' ' + /*selected*/ ctx[2].text + '(s)'
    			: '[waiting...]') + "")) set_data_dev(t23, t23_value);

    			if (dirty & /*chosenSeats*/ 1 && t28_value !== (t28_value = /*chosenSeats*/ ctx[0].length + "")) set_data_dev(t28, t28_value);

    			if (dirty & /*snacks*/ 2) {
    				each_value = /*snacks*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_each(each_blocks_2, detaching);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let name = "Jakob";
    	let src = "./images/mom-image.jpg";
    	let columns = 14;
    	let rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    	let availableTickets = [];
    	let i;
    	let j;
    	let seat;
    	let chosenSeats = [];

    	for (i = 0; i < rows.length; i++) {
    		for (j = 0; j < columns; j++) {
    			seat = rows[i] + `${j}`;
    			availableTickets.push(seat);
    		}
    	}

    	let snacks = [
    		{ id: 1, text: `Large Popcorn`, count: 0 },
    		{ id: 2, text: `Icee`, count: 0 },
    		{
    			id: 3,
    			text: `Vanilla Ice Cream Scoop`,
    			count: 0
    		},
    		{ id: 4, text: `Baked Pretzel`, count: 0 },
    		{
    			id: 5,
    			text: `Mike N Ikes Pack`,
    			count: 0
    		}
    	];

    	let selected;
    	let answer = '';

    	function handleSubmit() {
    		$$invalidate(1, snacks[selected.id - 1].count += answer, snacks);
    		alert(`Purchased ${answer} ${selected.text}(s)`);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	const $$binding_groups = [[]];

    	function input_change_handler() {
    		chosenSeats = get_binding_group_value($$binding_groups[0], this.__value, this.checked);
    		$$invalidate(0, chosenSeats);
    	}

    	function select_change_handler() {
    		selected = select_value(this);
    		$$invalidate(2, selected);
    		$$invalidate(1, snacks);
    	}

    	const change_handler = () => $$invalidate(3, answer = '');

    	function input_input_handler() {
    		answer = to_number(this.value);
    		$$invalidate(3, answer);
    	}

    	$$self.$capture_state = () => ({
    		name,
    		src,
    		columns,
    		rows,
    		availableTickets,
    		i,
    		j,
    		seat,
    		chosenSeats,
    		snacks,
    		selected,
    		answer,
    		handleSubmit
    	});

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) name = $$props.name;
    		if ('src' in $$props) $$invalidate(5, src = $$props.src);
    		if ('columns' in $$props) $$invalidate(6, columns = $$props.columns);
    		if ('rows' in $$props) $$invalidate(7, rows = $$props.rows);
    		if ('availableTickets' in $$props) $$invalidate(8, availableTickets = $$props.availableTickets);
    		if ('i' in $$props) $$invalidate(4, i = $$props.i);
    		if ('j' in $$props) j = $$props.j;
    		if ('seat' in $$props) seat = $$props.seat;
    		if ('chosenSeats' in $$props) $$invalidate(0, chosenSeats = $$props.chosenSeats);
    		if ('snacks' in $$props) $$invalidate(1, snacks = $$props.snacks);
    		if ('selected' in $$props) $$invalidate(2, selected = $$props.selected);
    		if ('answer' in $$props) $$invalidate(3, answer = $$props.answer);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		chosenSeats,
    		snacks,
    		selected,
    		answer,
    		i,
    		src,
    		columns,
    		rows,
    		availableTickets,
    		handleSubmit,
    		input_change_handler,
    		$$binding_groups,
    		select_change_handler,
    		change_handler,
    		input_input_handler
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
