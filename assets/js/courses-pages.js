function toggleChapter(element) {
    const chapterList = element.nextElementSibling;
    const arrow = element.querySelector('span');
    
    if (chapterList.style.display === 'none') {
        chapterList.style.display = 'block';
        arrow.textContent = '▲';
    } else {
        chapterList.style.display = 'none';
        arrow.textContent = '▼';
    }
}