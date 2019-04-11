self.onmessage = function (data) {
    self.runTask();
    self.postMessage(data.data + 1);   
};

self.runTask = () => {
    for(let i = 0; i < 10000000; i ++) {
      let result = Math.sqrt(i)^2;
    }
}
