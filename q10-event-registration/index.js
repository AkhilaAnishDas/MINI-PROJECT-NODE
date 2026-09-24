const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 5050;
const FILE = "./registrations.json";

app.use(express.json());

app.post("/registrations", (req, res) => {
    const { participantName, email, eventName } = req.body;

    if (!participantName || !email || !eventName) {
        return res.status(400).json({
            success: false,
            message: "participantName, email and eventName are required"
        });
    }

    fs.readFile(FILE, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error reading registrations file"
            });
        }

        let registrations;

        try {
            registrations = JSON.parse(data);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Invalid JSON file"
            });
        }

        const alreadyRegistered = registrations.some(
            registration =>
                registration.email === email &&
                registration.eventName === eventName
        );

        if (alreadyRegistered) {
            return res.status(409).json({
                success: false,
                message: "Already registered for this event"
            });
        }

        const newId =
            registrations.length === 0
                ? 1
                : Math.max(
                    ...registrations.map(registration => registration.id)
                ) + 1;

        const newRegistration = {
            id: newId,
            participantName,
            email,
            eventName
        };

        registrations.push(newRegistration);

        fs.writeFile(
            FILE,
            JSON.stringify(registrations, null, 2),
            "utf8",
            err => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Error saving registration"
                    });
                }

                res.status(201).json({
                    success: true,
                    message: "Registration successful",
                    data: newRegistration
                });
            }
        );
    });
});

app.get("/registrations", (req, res) => {
    fs.readFile(FILE, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error reading registrations file"
            });
        }

        try {
            const registrations = JSON.parse(data);

            res.status(200).json({
                success: true,
                count: registrations.length,
                data: registrations
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Invalid JSON file"
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});