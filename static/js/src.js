
// サンプル選択時のアラート内のselect表示
const alertSelect = () => {

    const values = ['boston.csv', 'titanic.csv', 'dummy.csv'];

    const div = document.createElement('div');
    div.setAttribute('class', 'cp_ipselect cp_sl01');

    const select = document.createElement('select');
    select.setAttribute('onchange', 'sampleHandler(this.value);')

    const defaultOption = document.createElement('option');
    const defaultLabel = document.createElement("label");
    defaultOption.setAttribute('value', '');
    defaultLabel.innerHTML = 'サンプルを選択してください';
    defaultOption.appendChild(defaultLabel);
    select.appendChild(defaultOption);

    for (let i = 0; i < values.length; i++) {

        const option = document.createElement('option');
        option.setAttribute("value", values[i]);
        option.innerHTML = values[i];

        select.appendChild(option);

    }

    div.appendChild(select);

    Swal.fire({
        title: 'サンプルを選んでください',
        html: div,
        confirmButtonColor: '#384878'
    })

}


const createTargetMenu = (columns) => {

    // 親のdivを呼び出し
    const wrapper = document.getElementById('wrapper');

    // target_menuが作られている場合には削除する
    if (document.getElementById('target_menu')) {

        const targetMenu = document.getElementById('target_menu');
        for (let i = targetMenu.childNodes.length - 1; i >= 0; i--) {
            targetMenu.removeChild(targetMenu.childNodes[i]);
        }

    }

    // target_menuを作成
    const targetMenu = document.createElement('div');
    targetMenu.setAttribute('id', 'target_menu')

    // selectを作成、カラムはここで表示する
    const select = document.createElement('select');
    select.setAttribute('name', 'target');

    // defaultの表示だけ作成
    const defaultOption = document.createElement('option');
    const defaultLabel = document.createElement('label');
    defaultOption.setAttribute('value', '');
    defaultLabel.innerHTML = '目的変数を選択してください';
    defaultOption.appendChild(defaultLabel);
    select.appendChild(defaultOption);

    // カラムをselectに追加
    for (let i = 0; i < columns.length; i++) {

        const option = document.createElement('option');
        option.setAttribute("value", columns[i]);
        option.innerHTML = columns[i];

        select.appendChild(option);

    }

    // それぞれの要素を親に追加
    targetMenu.appendChild(select);
    wrapper.appendChild(targetMenu);

}