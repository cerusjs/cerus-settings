var settings = require("../index")();

console.log(settings.name + " (" + settings.version + ")");

settings.settings().setting("key", "value1");
settings.settings().setting("key1.key2", "value2");
settings.settings().setting("key1.key3", "value3");
settings.settings().setting("key4.key5.key6", "value4");
settings.settings().setting("key4.key5.key7", "value5");
settings.settings().setting("key4.key5.key8", "value6");
settings.settings().setting("key4.key9", "value7");

console.log("Test1: " + (settings.settings().key() === "value1"));
console.log("Test2: " + (settings.settings().key1().key2() === "value2"));
console.log("Test3: " + (settings.settings().key1().key3() === "value3"));
console.log("Test4: " + (settings.settings().key4().key5().key6() === "value4"));
console.log("Test5: " + (settings.settings().key4().key5().key7() === "value5"));
console.log("Test6: " + (settings.settings().key4().key5().key8() === "value6"));
console.log("Test7: " + (settings.settings().key4().key9() === "value7"));