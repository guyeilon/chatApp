const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', (req, res) => {
	const { message } = req.body;
	const py = spawn('python3', ['chat_script.py']);

	let output = '';
	py.stdout.on('data', data => {
		output += data.toString();
	});

	py.stderr.on('data', data => {
		console.error('[Python Error]', data.toString());
	});

	py.stdin.write(JSON.stringify({ command: 'chat', message }) + '\n');
	py.stdin.end();

	py.on('close', () => {
		const responses = extractJsonObjects(output);
		res.json({ responses });
	});
});

function extractJsonObjects(text) {
	const results = [];
	const regex = /({[^{}]+})/g;
	let match;

	while ((match = regex.exec(text)) !== null) {
		try {
			const fixed = match[1].replace(/'/g, '"');
			results.push(JSON.parse(fixed));
		} catch (e) {
			console.warn('⚠️ Failed to parse JSON:', match[1]);
		}
	}

	return results;
}

app.listen(3001, () => {
	console.log('✅ Server running on http://localhost:3001');
});
