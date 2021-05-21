const browsersEndTransitions = {
    'transition':'transitionend',
    'OTransition':'oTransitionEnd',
    'MozTransition':'transitionend',
    'WebkitTransition':'webkitTransitionEnd'
};

function getTransitionEndEventName() {
    const fakeElement = document.createAttribute('fake');

    for(const t in browsersEndTransitions) {
        if (fakeElement[t] !== undefined) {
            return browsersEndTransitions[t];
        }
    }
    return ""
}

export default getTransitionEndEventName();