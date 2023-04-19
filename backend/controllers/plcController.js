//@description plc actions
//@access public
const asyncHandler = require('express-async-handler');
const { connectSerialPort, disconnect, sendCommand, list, openPort } = require('../plc')

const connect = asyncHandler(
    async (req, res) => {
        let path = req.body.path;
        //return the serial port
        connectSerialPort(path);

        res.status(200).send({data: 'Connection Successful'})
    }   
)

const listOfAvailablePorts = asyncHandler(
    async (req, res) => {
        const serialPorts = await list();
        res.status(200).send({ports: serialPorts})
    }   
)

const getPlcId = asyncHandler(
    async (req, res) => {
        const data = sendCommand(req.body.command);
        res.status(200).send({message: 'Command sent successfully.'});
    }   
)

const disconnectPort = asyncHandler(
    async (req, res) => {
        const data = disconnect();
        res.status(200).send({message: 'Command sent successfully.'})
    }   
)

module.exports = { connect, listOfAvailablePorts, getPlcId, disconnectPort }
