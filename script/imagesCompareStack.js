export default class ImagesCompareStack {
  constructor(max) {
    this.stack = [];
    this.max = max;
    this.stackUpdatedEvent =  new CustomEvent('stackUpdate', 
    {
      detail: {
        id: '', 
        currSize: 0
      }
    });
  }
  
  push(value) {
    if (this.stack.length === this.max) {
      console.log('Stack is already full');
      return false;
    }
    this.stack.push(value);
    // console.log('stack size: '+ this.stack.length);
    this.dispatchStackUpdateEvent(value);
    return true;  
  }

  pop() {
    if (this.stack.length === 0) {
      console.log('Stack is empty');
      return;
    }
    return this.stack.pop();
  }

  getAsArr(){
    return this.stack;
  }

  size() {
    return this.stack.length;
  }

  isFull(){
    return this.stack.length == this.max;
  }

  canPush() { return this.size() < this.max }

  notifyFullStack(){
    // document.dispatchEvent(this.stackUpdatedEvent);
  }

  dispatchStackUpdateEvent(img) {
    this.stackUpdatedEvent = new CustomEvent('stackUpdate', { 
      detail: {
        id: img, 
        currSize: this.stack.length
        }
      });
    document.dispatchEvent(this.stackUpdatedEvent);
  }
}

