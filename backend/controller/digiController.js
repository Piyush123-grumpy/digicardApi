
import digiCard from "../models/digicard.js";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';

export const createDigicard = async (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const imagesFolderPath = path.join(__dirname, '..', 'images');
    try {
        const data = req.body;
        if (req.file === undefined) {
            const newdigicard = new digiCard(data);
            const saveddigicard = await newdigicard.save();
            // console.log(saveddigicard);
            res.json(saveddigicard);

        }
        else {
            const imageFileName = req.file.filename; // Assuming req.filename is the image file name
            const imagePath = path.join(imagesFolderPath, imageFileName);

            // Read the image file using fs.readFileSync
            data.img = {
                data: fs.readFileSync(imagePath),
                contentType: 'image/png'
            };

            // console.log(data)
            const newdigicard = new digiCard(data);
            const saveddigicard = await newdigicard.save();
            // console.log(saveddigicard);
            res.json(saveddigicard);
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error saving profile data.' });
    }
}


export const getDigicard = async (req, res) => {
    const { id } = req.params;
    try {
        const singleDigiCard = await digiCard.findById(id);
        if (!singleDigiCard) {
            return res.status(404).json({ message: 'digiCard not found' });
        }
        res.json(singleDigiCard);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching digiCard', error: error.message });
    }
}


export const getAllDigiCard = async (req, res) => {
    const userId = req.params.userId;
    console.log(userId)

    try {
        const digiCards = await digiCard.find({ user: userId });
        res.json(digiCards);
    } catch (error) {
        console.error('Error fetching digiCards:', error);
        res.status(500).json({ error: 'Error fetching digiCards.' });
    }
};

export const editDigicard = async (req, res) => {
    console.log('hit')
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const imagesFolderPath = path.join(__dirname, '..', 'images');
    try {
        const digiCardId = req.params.id; // Assuming the ID is passed as a parameter
        console.log(req.file)
        const data = req.body;
        if (req.file === undefined) {
            // No new image provided, update other fields
            const updatedDigiCard = await digiCard.findByIdAndUpdate(
                digiCardId,
                { $set: data },
                { new: true }
            );
            console.log('hieeet')
            res.json(updatedDigiCard);
        } else {
            const imageFileName = req.file.filename; // Assuming req.filename is the image file name
            const imagePath = path.join(imagesFolderPath, imageFileName);

            // Read the new image file using fs.readFileSync
            data.img = {
                data: fs.readFileSync(imagePath),
                contentType: 'image/png'
            };

            // Update other fields and image data
            const updatedDigiCard = await digiCard.findByIdAndUpdate(
                digiCardId,
                { $set: data },
                { new: true }
            );

            res.json(updatedDigiCard);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error updating profile data.' });
    }
};
