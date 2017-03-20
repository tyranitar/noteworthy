pkg load sockets;

args = argv();

cd(args{1});
port = str2num(args{2});
bufferSize = str2num(args{3});

s = socket();
bind(s, port);
listen(s, 0);

client = accept(s);

[Theta1, Theta2] = load_weights();

while true
    [buffer, count] = recv(client, bufferSize);

    if count > 0
        try
            input_location = char(buffer);
            output_location = predict_notes(Theta1, Theta2, input_location);
            send(client, output_location);
        catch err
            disp(err.message);
            send(client, err.message);
        end
    else
        % Client disconnected.
        break;
    end
end