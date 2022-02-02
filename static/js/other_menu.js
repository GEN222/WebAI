
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