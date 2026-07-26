import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    // Разрешаем фронтенду читать данные (CORS заголовки)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    const uri = "mongodb://144.124.241.83:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("fal_bot_db");
        // Забираем единственный документ с тарифами
        const tariffs = await db.collection("tariffs").findOne({});
        
        if (!tariffs) {
            return res.status(404).json({ error: "Tariffs not found in DB" });
        }
        
        // Отдаем JSON обратно на сайт
        return res.status(200).json(tariffs);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } finally {
        await client.close();
    }
}
