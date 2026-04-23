filename=$1
lines=()

if [[ -f "$filename" ]]; then
  while IFS= read -r line || [ -n "$line" ]; do
    # Skip commented out or empty lines
    if [[ -n "$line" && "${line:0:1}" != "#" ]]; then
      lines+=("ENV.$line")
      lines+=("davinci-app.ENV.$line")
    fi
  done < "$filename"
fi

printf -v output '%s,' "${lines[@]}"
echo "${output%,}"
