import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import axios from 'axios';

type IProps = {
	data: string[];
};

const Home: NextPage<IProps> = () => {
	const [prompt, setPrompt] = useState<string | null>(null);
	const [OpenAIResponse, setOpenAIResponse] = useState<string | null>(null);
	const [RapidResponse, setRapidResponse] = useState<string | null>(null);

	const generateOpenAIData = async () => {
		try {
			const response = await axios.post('/api/openai', {
				prompt: prompt,
			});
			setOpenAIResponse(response.data.data[0]);
		} catch (err) {
			console.log(err);
		}
	};
	const generateRapidData = async () => {
		try {
			const response = await axios.post('/api/rapid', {
				prompt: prompt,
			});
			setRapidResponse(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center py-2">
			<Head>
				<title>Rapid + OpenAI Template</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex w-full flex-col items-center justify-center text-center my-16">
				<h1 className="text-7xl font-bold">Rapid + OpenAI Template</h1>
				<p className="mt-8 text-2xl md:w-2/5">Prompt any data from OpenAI and Rapid APIs</p>
			</main>
			<div className="flex flex-col mt-12 justify-center">
				<p className="block mb-10 text-center text-secondary text-xs uppercase font-bold">
					Made by{' '}
					<a
						href="https://rapidapi.com/?utm_source=github.com/RapidAPI&utm_medium=DevRel&utm_campaign=DevRel"
						className="underline"
					>
						Rapid
					</a>{' '}
					DevRel Team • Powered by{' '}
					<a
						href="https://rapidapi.com/hub?utm_source=RapidAPI.com/templates&utm_medium=DevRel&utm_campaign=DevRel"
						className="underline"
					>
						Rapid
					</a>{' '}
					and{' '}
					<a href="https://openai.com/" className="underline">
						OpenAI
					</a>
				</p>
			</div>
		</div>
	);
};

export default Home;
