const socketIO = require("socket.io");
const userModel = require("./models/user.model");
const driverModel = require("./models/driver.model");
let io;

function initializeSocket(server) {
  io = socketIO(server, {
    cors: {
      origin: "https://ride-application-01.netlify.app",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket"]
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      if (!data || typeof data != "object") {
        console.warn("Invalid or missing data in 'join' event", data);
        return;
      }
      const { userId, userType } = data;
      console.log(`User ${userId} joined as ${userType}`);

      if (!userId || !userType) {
        console.warn("Missing userId or userType in 'join' event", data);
        return;
      }
      try {
        if (userType === "user") {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if (userType === "driver") {
          await driverModel.findByIdAndUpdate(userId, { socketId: socket.id });
        } else {
          console.warn("Invalid userType:", userType);
        }
      } catch (err) {
        console.error("Error updating socket ID in DB:", err);
      }
    });

    socket.on("update-driver-location", async (data) => {
      const { userId, location } = data;

      // validation for location(must include latitude, longitude)
      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      console.log(`User ${userId} updated to location ${location}`);
      await driverModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

function sendMessageToSocketId(socketId, messageObject) {
  console.log(`Sending message to ${socketId}`, messageObject);
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("socket.io not initialized");
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };
