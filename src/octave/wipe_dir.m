function wipe_dir(file_dir)
    printf('wiping directory: %s\n', file_dir);

    [files, err, msg] = readdir(file_dir);

    if err
        error(msg);
    end

    for i = 1:length(files)
        file = files{i};
        file_path = strcat(file_dir, file);
        [unused, name, ext] = fileparts(file_path);

        if strcmp(ext, '.')
            continue;
        end

        unlink(file_path);
    end
end