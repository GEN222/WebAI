

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
        max_depth_int.setAttribute('value', '100');
        max_depth_int.setAttribute('max', '1000');
        max_depth_int.setAttribute('min', '1');
        element.appendChild(max_depth_int);

    } else {

        element.removeChild(element.childNodes[2]);

    }
}


const maxLeafNodesFunc = (element) => {

    if (!element.childNodes[2]) {

        let max_leaf_nodes_int = document.createElement('input');
        max_leaf_nodes_int.setAttribute('type', 'number');
        max_leaf_nodes_int.setAttribute('name', 'model_param_5');
        max_leaf_nodes_int.setAttribute('value', '15');
        max_leaf_nodes_int.setAttribute('max', '200');
        max_leaf_nodes_int.setAttribute('min', '0');
        element.appendChild(max_leaf_nodes_int);

    } else {

        element.removeChild(element.childNodes[2]);

    }
}