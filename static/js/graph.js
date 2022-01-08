

// グラフのメニュー作成
const createGraphMenu = () => {

    const wrapper = document.getElementById('wrapper');

    const graphMenuId = 'graph_menu';

    removeElement(graphMenuId);

    const graphMenu = document.createElement('div');
    graphMenu.setAttribute('id', graphMenuId);

    const select = document.createElement('select');
    select.setAttribute('name', 'kinds');
    select.appendChild(createOption('default', 'グラフの種類を選んでください'));

    const kinds_options_html = ["棒グラフ(1要素)", "棒グラフ(2要素)", "散布図", "可視分布", "ヒストグラム"];
    const kinds_options_value = ["count1", "count2", "reg", "swarm", "hist"];

    for (let i = 0; i < kinds_options_html.length; i++) {

        select.appendChild(createOption(kinds_options_value[i], kinds_options_html[i]));

    }

    graphMenu.appendChild(select);
    wrapper.appendChild(graphMenu);

}
