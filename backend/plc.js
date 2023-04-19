const {SerialPort, ReadlineParser} = require('serialport');
const parser = new ReadlineParser();
const { getIO } = require('./socket');
//const io = getIO();
let serialPort;

function connectSerialPort(path) {
    serialPort = new SerialPort({
        path: path,
        baudRate: 115200,
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
        flowControl: false,
    });

    //console.log('Checki 2')
    serialPort.pipe(parser);

    serialPort.on('open', (data) => {
        const io = getIO();
        io.emit('plcconnect', {
            message: 'Port Open Successfully. Please select your action below..',
            data: data,
            error: false
        });
        console.log(data)
    })

    // serialPort.on('close', (data) => {
    //     const io = getIO();
    //     io.emit('close', {
    //         message: '',
    //         data: data,
    //         error: false
    //     });
    //     console.log('luv dat close', data)
    // })

    parser.on('data', (data) => {
        const io = getIO();
        io.emit('data', {
            message: data.toString(),
            error: false
        });
        console.log('on data', data.toString())
    });

    serialPort.on('error', (err) => {
        const io = getIO();
        io.emit('data', {
            message: err.toString(),
            error: true
        });
        console.log(err.toString())    
    })

    return serialPort;
}

async function openPort(serialPort){
    await serialPort.open(err => {
        if(err) {
            return console.log('Error Opening Port: ', err.message)
        }
    
        return console.log('Port Open')
    })

    return console.log('Mnake')
}

function disconnect() {
    serialPort.close((err) => {
        if(err) {
            console.log('Error Disconnecting from serial port');
        }else{
            console.log('Serial Disconnected');
        }
    })
}

function sendCommand(command) {
    serialPort.write(command, (err) => {
        const io = getIO();
        if(err) {
            io.emit('plciderror', {
                message: err.toString(),
                error: true
            });
            //return  console.log('Error on Write', err.message)
        }
            
        // io.emit('plcidsuccess', {
        //     message: 'Write Successful',
        //     error: false
        // });
        
        //return console.log('message written')
    })
}

function list() {
   return SerialPort.list().then(response => {
        return (response)
    })
    .catch(e => {
        return e;
    })
}

module.exports = { connectSerialPort, disconnect, sendCommand, list, openPort, sendCommand }


