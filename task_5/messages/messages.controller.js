exports.get_messages_handler = (req, res) => {
    const { query } = req;
    let all_messages = res.app.locals.messages;
    all_messages = all_messages.map(item => {
        return {
            id: item.id,
            text: item.text,
            addedAt: item.addedAt,
            sender: item.sender
        }
    })
    let displayed_messages = [];

    let limit = query['limit'];
    let skip;

    if (limit > 0 && limit < 51) {
        limit = query['limit'];
    } else {
        limit = 10;
    }  
    
    if (query['skip'] > 0 && query['skip'] < 501) {
        skip = query['skip'];
    } else {
        skip = 0;
    }
    

    if (parseInt(limit) !== 10) {
        for(let i = 0; i < limit; i++) {
            if (all_messages[i]) {
                displayed_messages.push(all_messages[i]);
            }            
        }
    } else {
        displayed_messages = all_messages;
    }

    if (skip > 0) {
        displayed_messages = displayed_messages.splice(parseInt(skip));
    }    
    
    res.send(displayed_messages);
}

exports.get_message_by_id = (req, res) => {
    const { messages } = res.app.locals;
    const { id } = req.params;
    const message = messages.find(m => m.id === id);
    res.send(message);
}

exports.add_new_message = (req, res) => {
    const { messages } = res.app.locals;  
    const { text, sender } = req.body;
    const new_massage = { text, sender, id: messages.length + 1, addedAt: new Date() };
    messages.push(new_massage);
    res.send(new_massage);
}

exports.update_message = (req, res, next) => {
    const { messages } = res.app.locals;
    const { text } = req.body;
    const { id } = req.params;

    const message = messages.find(message => message.id === id);
    if(!message) {
        return next({ code: 404, message: 'not found' });
    }
    Object.assign(message, { text, updateAt: new Date() });

    res.send(message);
 }

 exports.delete_message = (req, res, next) => {
    const { messages } = res.app.locals;
    const { id } = req.params;

    const message_id = messages.findIndex(message => message.id === id);
    if(message_id < 0) {
        return next({ code: 404, message: 'not found' });
    }
    const message = messages[message_id];
    messages.splice(message_id, 1);

    res.send(message);
 }






