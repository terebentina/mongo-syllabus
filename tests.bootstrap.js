const context = require.context('./src/client', true, /__test__\/\S+\.js$/);
context.keys().forEach(context);
