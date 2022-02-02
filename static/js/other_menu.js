
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