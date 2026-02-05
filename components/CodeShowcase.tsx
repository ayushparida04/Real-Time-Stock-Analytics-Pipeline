import React, { useState } from 'react';
import { Code, Terminal, FileJson, Copy, Check } from 'lucide-react';
import { CodeSnippet } from '../types';

const SNIPPETS: CodeSnippet[] = [
  {
    title: 'C# Event Hub Producer',
    language: 'csharp',
    description: 'Simulates the high-throughput ingestion of stock tick data into Azure Event Hubs.',
    code: `using Azure.Messaging.EventHubs;
using Azure.Messaging.EventHubs.Producer;
using System.Text.Json;

public async Task SendStockTicksAsync(StockTick tick)
{
    // Initialize the connection string from Key Vault
    string connectionString = _configuration["EventHubConnection"];
    string eventHubName = "stock-ticks-bronze";

    await using (var producerClient = new EventHubProducerClient(connectionString, eventHubName))
    {
        // Create a batch of events 
        using EventDataBatch eventBatch = await producerClient.CreateBatchAsync();

        // Serialize the tick data to JSON
        var tickData = JsonSerializer.Serialize(tick);
        
        if (!eventBatch.TryAdd(new EventData(Encoding.UTF8.GetBytes(tickData))))
        {
            throw new Exception("Event is too large for the batch and cannot be sent.");
        }

        // Send the batch to the event hub
        await producerClient.SendAsync(eventBatch);
        Console.WriteLine($"Sent tick for {tick.Symbol} at {tick.Timestamp}");
    }
}`
  },
  {
    title: 'PySpark Streaming (Silver Layer)',
    language: 'python',
    description: 'Databricks job reading from Event Hubs, performing windowed aggregations.',
    code: `from pyspark.sql.functions import *
from pyspark.sql.types import *

# Define schema for incoming JSON
schema = StructType([
    StructField("symbol", StringType()),
    StructField("price", DoubleType()),
    StructField("timestamp", TimestampType())
])

# Read Stream from Event Hubs
df_raw = spark.readStream.format("eventhubs").options(**ehConf).load()

# Parse JSON payload
df_parsed = df_raw.withColumn("body", from_json(col("body").cast("string"), schema)) \
                  .select("body.*")

# Calculate 5-minute Moving Average using Sliding Window
df_windowed = df_parsed \
    .groupBy(
        window(col("timestamp"), "5 minutes", "1 minute"),
        col("symbol")
    ) \
    .agg(avg("price").alias("moving_avg_5m"))

# Write Stream to Delta Lake (Silver Table)
query = df_windowed.writeStream \
    .format("delta") \
    .outputMode("append") \
    .option("checkpointLocation", "/mnt/delta/silver/_checkpoints") \
    .table("stock_silver_aggregates")`
  }
];

const CodeShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SNIPPETS[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
            <Terminal size={18} className="text-blue-400"/>
            <h3 className="font-semibold text-gray-200">Engineering Implementation</h3>
        </div>
        <div className="flex space-x-1 bg-gray-900 rounded-lg p-1">
            {SNIPPETS.map((snippet, idx) => (
                <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`px-3 py-1 text-xs rounded-md transition-all ${activeTab === idx ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                >
                    {snippet.language === 'csharp' ? 'C# Producer' : 'PySpark Job'}
                </button>
            ))}
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-hidden flex flex-col">
        <div className="mb-4">
            <h4 className="text-lg font-bold text-white mb-1">{SNIPPETS[activeTab].title}</h4>
            <p className="text-sm text-gray-400">{SNIPPETS[activeTab].description}</p>
        </div>
        
        <div className="relative flex-1 bg-gray-950 rounded-lg border border-gray-800 overflow-hidden group">
             <button 
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 bg-gray-800 rounded-md text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
             >
                {copied ? <Check size={16} className="text-green-500"/> : <Copy size={16}/>}
             </button>
             <div className="absolute inset-0 overflow-auto p-4">
                <pre className="font-mono text-sm text-blue-300">
                    <code>{SNIPPETS[activeTab].code}</code>
                </pre>
             </div>
        </div>
      </div>
    </div>
  );
};

export default CodeShowcase;
