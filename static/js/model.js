
const createModelMenu = () => {

    const wrapper = document.getElementById('param_area');

    const modelMenuId = 'model_menu';

    removeElement(modelMenuId);

    const modelMenu = document.createElement('div');
    modelMenu.setAttribute('id', modelMenuId);

    // selectのdiv
    const selectMenu = document.createElement('div');
    selectMenu.setAttribute('class', 'general_select select1');

    const select = document.createElement('select');
    select.setAttribute('name', 'model');
    select.setAttribute('id', 'model');
    select.onchange = function () {
        // モデルに応じて表示するパラメータを変更
        createModelParamMenu(this);
    }

    // 最初に表示される選択肢
    select.appendChild(createOption('default', 'モデルを選択してください'));

    const modelList = ['RandomForestClassifier', 'RandomForestRegressor', 'XGBoost'];

    // modelListの内容をselectに加える
    for (let i = 0; i < modelList.length; i++) {

        select.appendChild(createOption(modelList[i], modelList[i]));

    }

    selectMenu.appendChild(select);
    modelMenu.appendChild(createText('モデルとパラメーターを選択してください'));
    modelMenu.appendChild(selectMenu);
    wrapper.appendChild(modelMenu);

}


// モデルのハイパーパラメータを表示
const createModelParamMenu = (model) => {

    const modelMenu = document.getElementById("model_menu");

    const modelParamMenuId = 'model_param_menu';

    removeElement(modelParamMenuId);

    const modelParamMenu = document.createElement('div');
    modelParamMenu.setAttribute('id', modelParamMenuId);
    modelParamMenu.setAttribute('class', 'model_param_menu');

    const ul = document.createElement('ul');

    if (model.value == 'RandomForestClassifier') {

        modelParams = getRandomForestClassifierParams();

        for (let i = 0; i < modelParams.length; i++) {
            ul.appendChild(modelParams[i])
        }

        modelParamMenu.appendChild(ul);

    } else if (model.value == "RandomForestRegressor") {

        modelParams = getRandomForestRegressorParams();

        for (let i = 0; i < modelParams.length; i++) {
            ul.appendChild(modelParams[i])
        }

        modelParamMenu.appendChild(ul);

    } else if (model.value == "XGBoost") {

        modelParams = getXGBoostParams();

        for (let i = 0; i < modelParams.length; i++) {
            ul.appendChild(modelParams[i])
        }

        modelParamMenu.appendChild(ul);
    }

    modelMenu.appendChild(modelParamMenu);
}


//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//---------modelパラメーターのみ可読性のために変数規則をスネークケースにしています！！---------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------


// ハイパーパラメータ内のmaxDepthとmaxLeafNodesの挙動
const maxDepthFunc = (element) => {

    if (!element.childNodes[2]) {

        const max_depth_int = document.createElement('input');
        max_depth_int.setAttribute('type', 'number');
        max_depth_int.setAttribute('name', 'model_param_3');
        max_depth_int.setAttribute('id', 'model_param_3_1');
        max_depth_int.setAttribute('value', '100');
        max_depth_int.setAttribute('max', '1000');
        max_depth_int.setAttribute('min', '1');
        element.appendChild(max_depth_int);
        element.appendChild(createSpinnerBox('model_param_3_1', 1000, 1, 1)[0]);
        element.appendChild(createSpinnerBox('model_param_3_1', 1000, 1, 1)[1]);

    } else {

        element.removeChild(element.childNodes[2]);
        element.removeChild(element.childNodes[2]);
        element.removeChild(element.childNodes[2]);

    }
}


const maxLeafNodesFunc = (element) => {

    if (!element.childNodes[2]) {

        let max_leaf_nodes_int = document.createElement('input');
        max_leaf_nodes_int.setAttribute('type', 'number');
        max_leaf_nodes_int.setAttribute('name', 'model_param_5');
        max_leaf_nodes_int.setAttribute('id', 'model_param_5_1');
        max_leaf_nodes_int.setAttribute('value', '15');
        max_leaf_nodes_int.setAttribute('max', '200');
        max_leaf_nodes_int.setAttribute('min', '0');
        element.appendChild(max_leaf_nodes_int);
        element.appendChild(createSpinnerBox('model_param_5_1', 200, 0, 1)[0]);
        element.appendChild(createSpinnerBox('model_param_5_1', 200, 0, 1)[1]);

    } else {

        element.removeChild(element.childNodes[2]);
        element.removeChild(element.childNodes[2]);
        element.removeChild(element.childNodes[2]);

    }
}