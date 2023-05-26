const express = require("express");
const router = express.Router();
const Events = require("../models/Events");

//  Routes1: get an existing events by it unique id
router.get("/events/:id", async (req, res) => {
  // Find the event with unique id
  try {
    const event = await Events.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//  Routes2: Gets an event by its recency & paginate results by page number and limit of events per page
router.get("/events", async (req, res) => {
  // Find the event with limit
  const { page = 1, limit = 5 } = req.query;
  try {
    // get all events from mongodb
    const events = await Events.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    // get total documents in the Posts collection
    const count = await Events.countDocuments();
    // return response with posts, total pages, and current page
    res.status(200).json({
      events,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Routes3: create an event to mongodb with post api
router.post("/events", async (req, res) => {
  try {
    const event = new Events(req.body);
    const saveEvent = await event.save();
    res.json(saveEvent);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// Routes4: delete an existing event
router.delete("/events/:id", async (req, res) => {
  try {
    // find the event to be deleted
    let event = await Events.findById(req.params.id);
    if (!event) return res.status(404).send("Not Found");

    event = await Events.findByIdAndDelete(req.params.id);

    res.json({ success: "Event has been deleted" });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
