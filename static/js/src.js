
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


// 引数のidの要素が存在する場合、削除する
const removeElement = (id) => {

    if (document.getElementById(id)) {

        const element = document.getElementById(id);
        element.remove();

    }

}


const createTargetMenu = (columns) => {

    // 親のdivを呼び出し
    const wrapper = document.getElementById('wrapper');

    const targetMenuId = 'target_menu';

    // target_menuが作られている場合には削除する
    removeElement(targetMenuId);

    // target_menuを作成
    const targetMenu = document.createElement('div');
    targetMenu.setAttribute('id', targetMenuId);

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


const createNullMenu = (nullColumns) => {

    // keyを取得
    const keys = Object.keys(nullColumns);

    // 欠損値がない場合は処理しない
    if (keys.length > 0) {

        // 親のdivを呼び出し
        const wrapper = document.getElementById('wrapper');
        const nullMenuId = 'null_menu';

        // null_menuが作られている場合には削除する
        removeElement(nullMenuId);

        const nullMenu = document.createElement('div');
        nullMenu.setAttribute('id', nullMenuId);

        // selectを作成、カラムはここで表示する
        const select = document.createElement('select');
        select.setAttribute('name', 'kinds_null_columns');

        const defaultOption = document.createElement('option');
        const defaultLabel = document.createElement('label');
        defaultOption.setAttribute('value', '');
        defaultLabel.innerHTML = '欠損値を選択してください';
        defaultOption.appendChild(defaultLabel);
        select.appendChild(defaultOption);

        nullMenu.appendChild(select);

        for (let i = 0; i < keys.length; i++) {

            const option = document.createElement('option');
            option.setAttribute('value', keys[i]);
            option.innerHTML = keys[i] + ' : 欠損数/' + nullColumns[keys[i]][0] + '個(' + nullColumns[keys[i]][2] + '%)';
            select.appendChild(option);
            nullMenu.appendChild(createRadioMenu(keys[i]));

        }

        wrapper.appendChild(nullMenu);

    }

}


const createRadioMenu = (key) => {

    return creatObjMenu(key);

}



const creatObjMenu = (key) => {

    const div = document.createElement('div');
    div.setAttribute('id', 'null_' + key);
    // div.setAttribute('style', 'display: none');

    div.appendChild(createProcessingRadio(key, 'mode'));
    div.appendChild(createProcessingLabel(key, 'mode', '最頻値'));

    return div

}


const createProcessingRadio = (key, value) => {

    const input = document.createElement('input');
    input.setAttribute('name', key);
    input.setAttribute('type', 'radio');
    input.setAttribute('id', value + '_' + key);
    input.setAttribute('value', value);

    return input;

}

const createProcessingLabel = (key, value, labelName) => {

    const label = document.createElement('label');
    label.setAttribute('for', value + '_' + key);
    label.innerHTML = labelName;

    return label;
}