const $select = document.getElementById('select');

let value = 'title';    // default 값

$select.addEventListener('change', () => {
    if($select.value == 'content') {
        value = 'content';
        console.log(1);
    } else {
        value = 'user';
    };
});

if (value == 'title') {
    
} else if (value == 'content') {

} else {
    
}

