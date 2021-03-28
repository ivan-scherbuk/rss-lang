export const shuffle = (array) => {
    const _array = array.slice(0);
    for (let i = 0; i < array.length - 1; i++) {
        let randomIndex = Math.floor(Math.random() * (i + 1));

        // Swapping values
        let temp = _array[i];
        _array[i] = _array[randomIndex];
        _array[randomIndex] = temp;
    }

    return _array;
};


export const getRandomNumber = (min, max) => (
    Math.floor(
        Math.random() * (
            Math.floor(max) - Math.ceil(min) + 1
        ),
    ) + min
);

function toRel(objRect){

    return {
        right: objRect.right,
        left: objRect.right - objRect.width,
        top: objRect.top,
        bottom: objRect.top - objRect.height,
    }
}

const initCorrection = Array(2).fill({
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
})

export function checkCollision(obj1, obj2, correction = null) {
    const relObj1 = toRel(obj1)
    const relObj2 = toRel(obj2)

    //separate with correction and without for optimisation
    if(correction){
        return relObj1.right - correction[0].right > relObj2.left + correction[1].left //right
        && relObj1.left + correction[0].left < relObj2.right - correction[1].right //left
        && relObj1.top - correction[0].top > relObj2.bottom + correction[1].bottom //top
        && relObj1.bottom + correction[0].bottom < relObj2.top - correction[1].top //bottom
    } else {
        return relObj1.right > relObj2.left //right
        &&  relObj1.left < relObj2.right //left
        &&  relObj1.top > relObj2.bottom //top
        &&  relObj1.bottom < relObj2.top //bottom
    }
}