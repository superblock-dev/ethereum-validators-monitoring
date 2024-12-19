import yaml
import os

def parse_tranches():
    operators = []
    tranch_files = sorted([f for f in os.listdir('tranches') if f.startswith('tranche_')])

    for i, tranch_file in enumerate(tranch_files):
        operator_name = f"valinode{i+1}"
        keys = []

        # Read keys from tranch file
        with open(os.path.join('tranches', tranch_file), 'r') as f:
            for line in f:
                key = line.strip()
                if key:  # Skip empty lines
                    keys.append(key)

        # Create operator entry
        operator = {
            'name': operator_name,
            'keys': keys
        }
        operators.append(operator)

    # Create final YAML structure
    yaml_data = {'operators': operators}

    # Write to custom_mainnet.yaml
    with open('custom_mainnet.yaml', 'w') as f:
        yaml.dump(yaml_data, f, default_flow_style=False, indent=2, width=float("inf"))

if __name__ == "__main__":
    parse_tranches()
