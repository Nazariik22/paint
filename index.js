const state = {
    pages: [
        { title: 1, text: "" },
    ],
    pen: [20, 15, 10, 5, 1],
    radius: ['0', '50%', '10px'],
    color: [
        { color: "#000000" },
        { color: "#ffffff" },
        { color: "#ff0000" },
        { color: "#c4fa12" },
        { color: "#12fa50" },
        { color: "#12eafa" },
        { color: "#121efa" },
        { color: "#bc12fa" },
        { color: "#640a84" },
        { color: "#840a2d" },
        { color: "#430507" },
        { color: "#1b532d" },
    ],
    isFatching: false,

}
const stateSpan = {
    size: 10,
    color: '#000',
    radius: '0px',
    page: 0,
}
const container = document.getElementsByClassName('container')[0];
const obgectHeader = {
    header: document.getElementsByClassName('header_container')[0],
    dom() {
        this.header.innerHTML = '';
        state.pages.forEach((item) => {
            this.header.insertAdjacentHTML('beforeend', `
            <div class="title_header">
                <p>Проект ${item.title}</p>
                <span class="close">x</span>
            </div>
            `)
        });
        let close = Array.from(document.getElementsByClassName(' close'));
        let menu = Array.from(document.getElementsByClassName('title_header'));
        close.forEach((item, index) => {
            item.addEventListener('click', () => {
                menu[index].style.display = 'none';
                state.pages.pop(index);
                stateSpan.page = !0 ? stateSpan.page -= 1 : stateSpan.page = 0;
                destroyItem(state.pages[stateSpan.page].text);
            })
        });
        menu.forEach((item, index) => {
            item.addEventListener('click', () => {
                destroyItem(state.pages[index].text);
                stateSpan.page = index;
            })
        });
    },
    render() {
        this.dom();
        let create = document.getElementsByClassName('create')[0];
        create.addEventListener('click', () => {
            state.pages.push(
                { title: state.pages.length + 1, text: "" },
            );
            this.dom();
        })

    }
}
obgectHeader.render();
//!Aside
const color = document.getElementsByClassName('color_element')[0];
state.color.forEach((item, index) => {
    let div = document.createElement('div');
    div.style.backgroundColor = state.color[index].color;
    div.style.cursor = 'pointer';
    color.appendChild(div);
    //console.log(div.style)
})
const color_element = Array.from(document.querySelectorAll('.color_element div'));
color_element.forEach((item, index) => {
    item.addEventListener('click', () => {
        stateSpan.color = state.color[index].color;
        size();
        colorBorder();
    })
})
const forma = Array.from(document.querySelectorAll('.forma_element div'));
function colorBorder() {
    forma.forEach((item) => item.style.backgroundColor = stateSpan.color);
}
forma.forEach((item, index) => item.addEventListener('click', () => {
    stateSpan.radius = state.radius[index];
}));
const size_span = Array.from(document.querySelectorAll('.size_element span'));
size_span.reverse();
function size() {
    size_span.forEach((item, index) => {
        item.style.width = `${(index + 1) * 5}` + 'px';
        item.style.height = '10px';
        item.style.backgroundColor = stateSpan.color;
    })
}
size()
const size_div = Array.from(document.querySelectorAll('.size_element div'));
size_div.forEach((item, index) => item.addEventListener('click', () => {
    stateSpan.size = state.pen[index];
}));

//! container
function destroyItem(data = "") {
    container.innerHTML = data;
    let wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    container.appendChild(wrapper);
    wrapper.addEventListener('mousedown', () => {
        state.isFatching = true;
    })
    wrapper.addEventListener('mouseup', () => {
        state.isFatching = false;
    })
    wrapper.addEventListener('mousemove', (e) => {
        state.isFatching && render(e, stateSpan.color, stateSpan.size, stateSpan.radius);
        state.pages[stateSpan.page].text = container.innerHTML;
    })
}
const destroy = document.getElementsByClassName('destroyItem')[0];
destroy.addEventListener('click', () => destroyItem())
destroyItem();
function render(e, color, size, radius) {
    if (e.target !== e.currentTarget) return;
    let x = e.offsetX, y = e.offsetY;
    let span = document.createElement('span');
    span.style = `
        position: absolute;
        top:${y - (size) / 2}px;
        left:${x - (size) / 2}px;
        width: ${size}px;
        height: ${size}px;
        background:${color};
        border-radius: ${radius};
        z-index: -1;
    `
    container.appendChild(span)
}