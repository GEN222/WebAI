
const createNullMenu = (nullColumns) => {

    // keyを取得
    const keys = Object.keys(nullColumns);

    // 欠損値がない場合は処理しない
    if (keys.length > 0) {

        // 親のdivを呼び出し
        const wrapper = document.getElementById('param_area');
        const nullMenuId = 'null_menu';

        // null_menuが作られている場合には削除する
        removeElement(nullMenuId);

        const nullMenu = document.createElement('div');
        nullMenu.setAttribute('id', nullMenuId);

        // selectのdiv
        const selectMenu = document.createElement('div');
        selectMenu.setAttribute('class', 'general_select select1');
        // selectを作成、カラムはここで表示する
        const select = document.createElement('select');
        select.setAttribute('name', 'kinds_null_columns');
        // switchRadioMenusで表示するradioメニューを切り替える
        select.onchange = function () { switchRadioMenus(this.value, keys); };
        select.appendChild(createOption('default', '欠損値を選択してください'));

        nullMenu.appendChild(createText('欠損値の処理を選択してください', 'null'));
        selectMenu.appendChild(select);

        const radioMenu = document.createElement('div');

        for (let i = 0; i < keys.length; i++) {

            select.appendChild(createOption(keys[i], keys[i] + ' : 欠損数/' + nullColumns[keys[i]][0] + '個(' + nullColumns[keys[i]][2] + '%)'));
            radioMenu.appendChild(createRadioMenu(keys[i], nullColumns));

        }

        nullMenu.appendChild(selectMenu);
        nullMenu.appendChild(radioMenu);
        wrapper.appendChild(nullMenu);

    } else {
        // 欠損値がない場合にはメニューを削除
        removeElement('null_menu');
    }

}


// 指定された要素を表示し、他要素をすべて非表示
const switchRadioMenus = (key, keys) => {

    for (let i = 0; i < keys.length; i++) {

        const element = document.getElementById('null_' + keys[i]);
        if (key == keys[i]) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }

    }

}


const createRadioMenu = (key, nullColumns) => {

    if (key) {
        if (judgeType(nullColumns[key][1])) {
            return creatObjMenu(key);
        } else {
            return creatIntMenu(key);
        }
    }

}


// 引数がobjectか判定
const judgeType = (type) => {
    return type == 'object' ? true : false
}



const creatObjMenu = (key) => {

    const div = document.createElement('div');
    div.setAttribute('id', 'null_' + key);
    div.setAttribute('style', 'display: none');

    div.appendChild(createProcessingRadio(key, 'mode'));
    div.appendChild(createProcessingLabel(key, 'mode', '最頻値'));
    div.appendChild(createProcessingRadio(key, 'dele'));
    div.appendChild(createProcessingLabel(key, 'dele', '削除'));

    return div

}

const creatIntMenu = (key) => {

    const div = document.createElement('div');
    div.setAttribute('id', 'null_' + key);
    div.setAttribute('style', 'display: none');

    div.appendChild(createProcessingRadio(key, 'mode'));
    div.appendChild(createProcessingLabel(key, 'mode', '最頻値'));
    div.appendChild(createProcessingRadio(key, 'med'));
    div.appendChild(createProcessingLabel(key, 'med', '中央値'));
    div.appendChild(createProcessingRadio(key, 'ave'));
    div.appendChild(createProcessingLabel(key, 'ave', '平均値'));
    div.appendChild(createProcessingRadio(key, 'standard'));
    div.appendChild(createProcessingLabel(key, 'standard', '標準偏差'));
    div.appendChild(createProcessingRadio(key, 'dele'));
    div.appendChild(createProcessingLabel(key, 'dele', '削除'));

    return div

}


const createProcessingRadio = (key, value) => {

    const input = document.createElement('input');
    input.setAttribute('name', key);
    input.setAttribute('type', 'radio');
    input.setAttribute('id', value + '_' + key);
    input.setAttribute('value', value);
    input.setAttribute('class', 'check-inline__input');

    return input;

}

const createProcessingLabel = (key, value, labelName) => {

    const label = document.createElement('label');
    label.setAttribute('for', value + '_' + key);
    label.setAttribute('class', 'check-inline__label');
    label.innerHTML = labelName;

    return label;
}