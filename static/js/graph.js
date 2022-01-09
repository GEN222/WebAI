

// グラフのメニュー作成
const createGraphMenu = () => {

    const wrapper = document.getElementById('graph_area');

    const graphMenuId = 'graph_menu';

    removeElement(graphMenuId);

    const graphMenu = document.createElement('div');
    graphMenu.setAttribute('id', graphMenuId);
    graphMenu.setAttribute('class', 'general_select select1');

    const select = document.createElement('select');
    select.setAttribute('name', 'kinds');
    select.onchange = function () { switchGraphMenus(this.value) };
    select.appendChild(createOption('default', 'グラフの種類を選んでください'));

    const kinds_options_html = ['棒グラフ(1要素)', '棒グラフ(2要素)', '散布図', '可視分布', 'ヒストグラム'];
    const kinds_options_value = ['count1', 'count2', 'reg', 'swarm', 'hist'];

    for (let i = 0; i < kinds_options_html.length; i++) {

        select.appendChild(createOption(kinds_options_value[i], kinds_options_html[i]));

    }

    wrapper.appendChild(createText('グラフの種類を選んでください'));
    graphMenu.appendChild(select);
    wrapper.appendChild(graphMenu);

}


const switchGraphMenus = (kinds) => {

    const two_value_kinds = ['count2', 'reg', 'swarm'];

    if (two_value_kinds.includes(kinds)) {

        const xGraph = document.getElementById('x_graph_menu');
        const yGraph = document.getElementById('y_graph_menu');
        xGraph.style.display = '';
        yGraph.style.display = '';

    } else if (kinds == 'default') {

        const xGraph = document.getElementById('x_graph_menu');
        const yGraph = document.getElementById('y_graph_menu');
        xGraph.style.display = 'none';
        yGraph.style.display = 'none';

    } else {
        const xGraph = document.getElementById('x_graph_menu');
        const yGraph = document.getElementById('y_graph_menu');
        xGraph.style.display = '';
        yGraph.style.display = 'none';
    }

}


const createXGraphMenu = (values) => {

    const wrapper = document.getElementById('graph_area');

    const xGraphMenuId = 'x_graph_menu';
    removeElement(xGraphMenuId);

    const xGraphMenu = document.createElement('div');
    xGraphMenu.setAttribute('id', xGraphMenuId);
    xGraphMenu.setAttribute('class', 'general_select select1');
    xGraphMenu.setAttribute('style', 'display: none');

    const select = document.createElement('select');
    select.setAttribute('name', 'x');
    select.appendChild(createOption('default', 'X軸の要素を選んでください'));

    for (let i = 0; i < values.length; i++) {

        select.appendChild(createOption(values[i], values[i]));

    }

    wrapper.appendChild(createText('X軸の要素を選んでください'));
    xGraphMenu.appendChild(select);
    wrapper.appendChild(xGraphMenu);

}


const createYGraphMenu = (values) => {

    const wrapper = document.getElementById('graph_area');

    const yGraphMenuId = 'y_graph_menu';
    removeElement(yGraphMenuId);

    const yGraphMenu = document.createElement('div');
    yGraphMenu.setAttribute('id', yGraphMenuId);
    yGraphMenu.setAttribute('class', 'general_select select1');
    yGraphMenu.setAttribute('style', 'display: none');

    const select = document.createElement('select');
    select.setAttribute('name', 'y');
    select.appendChild(createOption('default', 'Y軸の要素を選んでください'));

    for (let i = 0; i < values.length; i++) {

        select.appendChild(createOption(values[i], values[i]));

    }

    wrapper.appendChild(createText('Y軸の要素を選んでください'));
    yGraphMenu.appendChild(select);
    wrapper.appendChild(yGraphMenu);

}


const createGraphButton = () => {

    const wrapper = document.getElementById('graph_area');
    const graphBtnId = 'graph_btn';

    removeElement(graphBtnId);

    const graphBtnMenu = document.createElement('div');
    graphBtnMenu.setAttribute('id', graphBtnId)

    const button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.onclick = function () {
        graphHandler();
    };
    button.setAttribute('class', 'btn');
    button.innerHTML = 'グラフ表示';

    graphBtnMenu.appendChild(button);
    wrapper.appendChild(graphBtnMenu);

}