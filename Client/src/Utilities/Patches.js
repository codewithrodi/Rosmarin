if(typeof Node === 'function' && Node.prototype){
    const OriginalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function(Child){
        if(Child.parentNode !== this)
            return Child;
        return OriginalRemoveChild.apply(this, arguments);
    }
}