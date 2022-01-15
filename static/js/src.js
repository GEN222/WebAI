
// content作成
const createContent = () => {

    const contentAreaClass = 'main_section';

    const contentId = 'content';
    removeElement(contentId);

    const wrapper = document.getElementById('wrapper');

    const content = document.createElement('div');
    content.setAttribute('id', contentId);
    content.setAttribute('class', 'content');

    const paramArea = document.createElement('div');
    const paramAreaId = 'param_area';
    paramArea.setAttribute('id', paramAreaId);
    paramArea.setAttribute('class', contentAreaClass);
    content.appendChild(paramArea);

    const graphArea = document.createElement('div');
    const graphAreaId = 'graph_area';
    graphArea.setAttribute('id', graphAreaId);
    graphArea.setAttribute('class', contentAreaClass);
    content.appendChild(graphArea);

    const imageArea = document.createElement('div');
    const imageAreaId = 'image_area';
    imageArea.setAttribute('id', imageAreaId);
    imageArea.setAttribute('class', contentAreaClass);
    content.appendChild(imageArea);


    wrapper.appendChild(content);

}


// サンプル選択時のアラート内のselect表示
const alertSelect = () => {

    const values = ['boston.csv', 'titanic.csv', 'dummy.csv'];

    const div = document.createElement('div');
    div.setAttribute('class', 'general_select select1');

    const select = document.createElement('select');
    select.onchange = function () {
        sampleHandler(this.value);
        displayFileName(this.value);
    };
    select.appendChild(createOption('default', 'サンプルを選択してください'));

    for (let i = 0; i < values.length; i++) {

        select.appendChild(createOption(values[i], values[i]));

    }

    div.appendChild(select);

    Swal.fire({
        title: 'サンプルを選んでください',
        html: div,
        confirmButtonColor: '#384878'
    })

}


// ファイルの名前を表示
const displayFileName = (filename) => {

    const fileNameArea = document.getElementById('file_name');
    fileNameArea.innerHTML = filename;

}


// 引数のidの要素が存在する場合、削除する
const removeElement = (id) => {

    if (document.getElementById(id)) {

        const element = document.getElementById(id);
        element.remove();

    }

}


// textを生成し戻す
const createText = (textValue, key) => {

    const div = document.createElement('div');
    const span = document.createElement('span');
    span.setAttribute('class', 'info_button');
    span.innerHTML = "？";
    span.onclick = function () { alertInfo(key); };
    const text = document.createElement('p');
    text.setAttribute('class', 'info_message');
    text.innerHTML = textValue;

    text.appendChild(span);
    div.appendChild(text);
    return div

}

const alertInfo = (key) => {

    // 引数に応じて表示する説明を変更する
    Swal.fire({
        icon: 'question',
        title: key,
        confirmButtonColor: '#384878'
    })
}


const createTargetMenu = (columns) => {

    // 親のdivを呼び出し
    const wrapper = document.getElementById('param_area');

    const targetMenuId = 'target_menu';

    // target_menuが作られている場合には削除する
    removeElement(targetMenuId);

    // target_menuを作成
    const targetMenu = document.createElement('div');
    targetMenu.setAttribute('id', targetMenuId);

    //selectのdivを作成
    const selectMenu = document.createElement('div');
    selectMenu.setAttribute('class', 'general_select select1');

    // selectを作成、カラムはここで表示する
    const select = document.createElement('select');
    select.setAttribute('name', 'target');

    // defaultの表示だけ作成
    select.appendChild(createOption('default', '目的変数を選択してください'));

    // カラムをselectに追加
    for (let i = 0; i < columns.length; i++) {

        select.appendChild(createOption(columns[i], columns[i]));

    }


    // それぞれの要素を親に追加
    selectMenu.appendChild(select);
    targetMenu.appendChild(createText('目的変数を選択してください', 'target'));
    targetMenu.appendChild(selectMenu);
    wrapper.appendChild(targetMenu);

}


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


const createDeleMenu = (values) => {

    const wrapper = document.getElementById('param_area');
    const deleMenuId = 'dele_menu';

    removeElement(deleMenuId);

    const deleMenu = document.createElement('div');
    deleMenu.setAttribute('id', deleMenuId);

    // checkboxのdiv
    const checkboxMenu = document.createElement('div');

    for (var i = 0; i < values.length; i++) {
        const input = document.createElement('input');
        const label = document.createElement('label');
        const br = document.createElement('br');
        const value = values[i];
        const id = 'dele_parameters_area_' + value;
        const name = 'dele_param';
        input.setAttribute('type', 'checkbox');
        input.setAttribute('value', value);
        input.setAttribute('id', id);
        input.setAttribute('name', name);
        input.setAttribute('class', 'check-inline__input');
        label.setAttribute('for', id);
        label.setAttribute('class', 'check-inline__label');
        label.innerHTML = value;

        checkboxMenu.appendChild(input);
        checkboxMenu.appendChild(label);

    }

    deleMenu.appendChild(createText('削除する値を選択してください', 'dele'));
    deleMenu.appendChild(checkboxMenu);
    wrapper.appendChild(deleMenu);
}

const createSubmitButton = () => {

    const wrapper = document.getElementById('param_area');
    const subBtnId = 'sub_btn';

    removeElement(subBtnId);

    const subBtnMenu = document.createElement('div');
    subBtnMenu.setAttribute('id', subBtnId)

    const button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.onclick = function () {
        paramHandler();
    };
    button.setAttribute('class', 'btn');
    button.innerHTML = '学習させる';

    subBtnMenu.appendChild(button);
    wrapper.appendChild(subBtnMenu);

}


const createImgMenu = () => {

    const wrapper = document.getElementById('image_area');

    const imgMenuId = 'img_menu';
    const imgMenuClass = 'img_menu';
    removeElement(imgMenuId);

    const imgMenu = document.createElement('div');
    imgMenu.setAttribute('id', imgMenuId);

    const img = document.createElement('img');
    const imgId = 'plot_graph';
    img.setAttribute('id', imgId);
    img.setAttribute('class', imgMenuClass);
    img.onclick = function () {
        alertImage();
    };

    imgMenu.appendChild(img);
    wrapper.appendChild(imgMenu);

}

const alertImage = () => {

    const img = document.getElementById('plot_graph');
    const src = img.src;

    Swal.fire({
        title: 'グラフ結果',
        imageUrl: src,
        imageAlt: 'Custom image',
        confirmButtonColor: '#384878'
    })

}

// option生成
const createOption = (value, html) => {

    const option = document.createElement('option');
    option.setAttribute("value", value);
    option.innerHTML = html;

    return option
}