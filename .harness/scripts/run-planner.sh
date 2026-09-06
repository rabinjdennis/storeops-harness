#!/bin/bash

set -e

echo "========================================"
echo "StoreOps Harness - Planner"
echo "========================================"

echo ""
echo "Input:"
echo "  .harness/input/PROMPT.md"

echo ""
echo "Planner agent:"
echo "  .harness/agents/planner.agent.md"

echo ""
echo "The Planner is responsible for:"
echo "  1. Reading the project context"
echo "  2. Reading the StoreOps API specification"
echo "  3. Creating spec.md"
echo "  4. Creating sprint-1-contract.md"
echo "  5. Setting the contract status to AWAITING APPROVAL"

echo ""
echo "Claude Code execution is intentionally not started yet."
echo "The Claude Code license is required before running the Planner."

echo ""
echo "Planner runner is ready."